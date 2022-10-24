import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { Student, Teacher, User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { ClassService } from 'src/app/Service/ClassService/class.service';
import { NgbModal, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from 'src/app/Service/DocumentService/document.service';
import { UploadDocumentWithData } from 'src/app/Model/UploadDocumentWithData';
import { saveAs } from 'file-saver';
import { UserService } from 'src/app/Service/UserService/user.service';
import { ClassInStudent } from 'src/app/Model/ClassInStudent';
import { StudentInClass } from 'src/app/Model/StudentInClass';
import { animate, style, transition, trigger } from '@angular/animations';
import { RemoveFromCLassRequest } from 'src/app/Model/RemoveFromClassRequest';
import { AddStudentRequest } from 'src/app/Model/AddStudentRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { UpdateGradeRequest } from 'src/app/Model/UpdateGradeRequest';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('300ms ease-out', style({ height: 31, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 31, opacity: 1 }),
        animate('300ms ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class ClassDetailsComponent implements OnInit {
  public classid: number = 0;
  public user!: Student | Teacher;
  public class!: ClassRoom;
  public classInLocal!: ClassRoom;
  public filesToUpload: File[] = [];
  public notes: string = '';
  public creator: boolean = false;
  public member: boolean = false;
  public modify: boolean = false;
  public newUser: string = '';
  public studentsWithoutGrade: StudentInClass[] = [];
  public selectedStudentId: number = 0;
  public selectedGrade: number = 0;
  public filter: string = '';
  public studentsToShow: StudentInClass[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ClassSrv: ClassService,
    private auth: AuthService,
    private modalService: NgbModal,
    private userSrv: UserService,
    private documentSrv: DocumentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.classid = +(params.get('cod') + '');
      this.ClassSrv.GetClass(this.classid).subscribe({
        next: (x) => {
          console.log(x);
          this.class = x;
          this.class.uploadedDocuments?.sort((a, b) => {
            if (a.dateOfUpdate > b.dateOfUpdate) return -1;
            else if (a.dateOfUpdate < b.dateOfUpdate) return 1;
            else return 0;
          });
          this.class.members?.forEach((x) => {
            if (x.grade == null) this.studentsWithoutGrade.push(x);
            this.selectedStudentId = x.id;
          });
        },

        error: (err) => console.log(err),

        complete: () => {
          this.auth.loggedUser().subscribe(
            x=>{
            if(x.authority==="STUDENT")
              this.user=new Student(x.id,x.username,x.firstName,x.lastName,x.authority,(x as Student).memberOf)
            else(this.user=new Teacher(x.id,x.username,x.firstName,x.lastName,x.authority,(x as Teacher).hasCreated))
            }
          )

          if (this.user instanceof Student) {
            if (this.user.memberOf?.find((x) => x.id == this.classid))
              this.member = true;
          } else if (this.user instanceof Teacher) {
            if (
              this.user.hasCreated?.find((x) => {
                this.classInLocal = x;
                return x.id == this.classid;
              })
            )
              this.creator = true;
          }
        },
      });
    });
  }

  handleFileInput(fileInputEvent: Event) {
    let event = fileInputEvent.target as HTMLInputElement;
    if (event.files) this.filesToUpload.push(event.files[0]);
    console.log(this.filesToUpload);
  }

  openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }
  remove(filename: File) {
    this.filesToUpload.splice(this.filesToUpload.indexOf(filename), 1);
  }
  uploadFiles() {
    if (this.creator && this.filesToUpload.length <= 4) {
      this.documentSrv
        .uploadDocument(
          new UploadDocumentWithData(this.filesToUpload, this.notes),
          this.classid
        )
        .subscribe((x) => {
          if (this.class.uploadedDocuments)
            this.class.uploadedDocuments = x.concat(
              this.class.uploadedDocuments
            );
        });
    }
  }
  download(id: number, filename: string) {
    if (this.member || this.creator) {
      this.documentSrv.downloadDocument(id).subscribe((blob) => {
        saveAs(blob, filename);
      });
    }
  }
  closeClassRoom() {
    if (
      confirm(
        'You are closing the class Room and all the file uploaded will be lost. Confirm?'
      )
    ) {
      let done = false;
      this.ClassSrv.DeleteClass(this.classid).subscribe(
        () => {
          done = true;
        },
        (e) => {
          alert("couldn't close the classroom");
        },
        () => {
          if (done) {
            if (this.creator && this.user instanceof Teacher)
              this.user.hasCreated?.splice(
                this.user.hasCreated.findIndex((x) => {
                  x.id == this.classid;
                }),
                1
              );
            this.auth.updateLocalUser(this.user);
            this.router.navigate([
              {
                outlets: {
                  primary: ['sidebar'],
                  content: ['home'],
                },
              },
            ]);
          }
        }
      );
    }
  }
  joinClassRoom() {
    if ((this.user instanceof Student) && !this.member) {
      let done = false;
      this.userSrv.joinClass(this.classid).subscribe({
        next: () => {
          done = true;
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          if (done && this.user instanceof Student) {
            this.user.memberOf?.push(
              new ClassInStudent(this.classid, this.class.className)
            );
            this.class.members?.push(
              new StudentInClass(this.user.id, this.user.username)
            );
            this.auth.updateLocalUser(this.user);
            this.member = true;
          }
        },
      });
    }
    else {
      console.log(this.user instanceof User)
      alert("You can't join this Class");
    }

  }

  leaveClassRoom() {
    if (this.user instanceof Student && this.member) {
      let done = false;
      this.userSrv.leaveClass(this.classid).subscribe({
        next: () => {
          done = true;
        },
        error: (e) => {
          alert(e.message);
        },
        complete: () => {
          if (done && this.user instanceof Student) {
            this.user.memberOf?.splice(
              this.user.memberOf.findIndex((x: ClassInStudent) => {
                x.id == this.classid;
              }),
              1
            );
            this.class.members?.splice(
              this.class.members.findIndex((x) => {
                x.id == this.user.id;
              })
            );
            this.auth.updateLocalUser(this.user);
            this.member = false;
          }
        },
      });
    }
  }
  DeleteFile(fileId: number, fileName: string) {
    if (confirm('You want to delete this file?\n' + fileName))
      this.documentSrv.deleteDocument(fileId).subscribe(() => {
        this.class.uploadedDocuments?.splice(
          this.class.uploadedDocuments.findIndex((x) => x.id == fileId),
          1
        );
        if (this.class.uploadedDocuments?.length == 0) this.modify = false;
      });
  }
  Mode() {
    this.modify = !this.modify;
  }
  RemoveFromClass(studentId: number) {
    if (confirm('are you sure you want to remove this user?')) {
      this.ClassSrv.RemoveFromClass(
        new RemoveFromCLassRequest(studentId, this.classid)
      ).subscribe({
        next: (x) => {
          alert('Remove Completed');
          this.class.members?.splice(
            this.class.members.findIndex((x) => x.id === studentId),
            1
          );
        },
        error: () => {
          alert("Couldn't remove the student");
        },
        complete: () => {},
      });
    }
  }

  AddUser() {
    this.ClassSrv.AddToClass(
      new AddStudentRequest(this.newUser, this.classid)
    ).subscribe({
      next: (x) => {
        alert('Completed');
        this.class.members?.push(x);
        this.newUser = '';
      },
      error: (x: HttpErrorResponse) => {
        alert("Can't add the Student: " + x.error.message);
      },
    });
  }

  AssignGrade() {
    this.ClassSrv.AssignGrade(
      this.classid,
      new UpdateGradeRequest(this.selectedStudentId, this.selectedGrade)
    ).subscribe({
      next: () => {
        this.studentsWithoutGrade.splice(
          this.studentsWithoutGrade.findIndex(
            (x) => x.id === this.selectedStudentId
          ),
          1
        );
        alert('Grade Assigned');
      },
    });
  }
  changeFilter() {
    this.studentsToShow = this.class.members!.filter((x) =>
      x.username.toLowerCase().includes(this.filter.toLowerCase())
    );
  }
  PopulateList() {
    this.studentsToShow = this.class.members!;
  }
}
