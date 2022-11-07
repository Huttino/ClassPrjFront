import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassInStudent } from 'src/app/Model/ClassInStudent';
import { PublicClassRoom } from 'src/app/Model/ClassRoom';
import { Scope, ScopeFilter } from 'src/app/Model/Scope';
import { StudentInClass } from 'src/app/Model/StudentInClass';
import { Student, Teacher, User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { ClassService } from 'src/app/Service/ClassService/class.service';
import { ScopeService } from 'src/app/Service/ScopeService/scope.service';
import { StudentService } from 'src/app/Service/StudentService/student.service';

@Component({
  selector: 'app-class-room-presentation',
  templateUrl: './class-room-presentation.component.html',
  styleUrls: ['./class-room-presentation.component.css']
})
export class ClassRoomPresentationComponent implements OnInit {
  public toShow: PublicClassRoom = new PublicClassRoom(0, "", "", [])
  private user!: Student | Teacher
  public member: boolean = false
  public creator: boolean = false
  private classId: number = 0
  public suggestedClassRooms: PublicClassRoom[] = []
  public authority: string = ''
  constructor(
    private publicSrv: ClassService,
    private route: ActivatedRoute,
    private studentSrv: StudentService,
    private authSrv: AuthService,
    public router: Router,
    public classSrv: ClassService,
    public scopeSrv: ScopeService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (!params.has('cod')) console.log('no classId')
      this.classId = +(params.get('cod') + "")
      this.classSrv.getClassCover(this.classId).subscribe((blob: Blob | null) => {
        if (blob == null) document.getElementById("classCoverSrc")?.setAttribute('src', "../../../assets/brush-strokes-background_53876-89327.jpg.webp")
        else {
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            var base64data = reader.result;
            document.getElementById("classCoverSrc")?.setAttribute('src', base64data?.toString() as string)
          }
        }
      }
      )
      this.publicSrv.getPublicClass(this.classId).subscribe(
        {
          next: (x) => {
            console.log(x)
            this.toShow = x
            this.authSrv.loggedUser().subscribe(
              x => {
                switch (x.authority) {
                  case "STUDENT":
                    this.authority = "STUDENT"
                    this.user = new Student(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Student).memberOf)
                    this.member = this.user.memberOf.some(y => y.id == this.classId)
                    break
                  case "TEACHER":
                    this.authority = "TEACHER"
                    this.user = new Teacher(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Teacher).hasCreated)
                    this.creator = this.user.hasCreated.some(y => y.id == this.classId)
                    break
                }
              }
            )
          },
          error: () => {
            this.router.navigate([{
              outlets: {
                primary: ['sidebar'],
                content: ['classList']
              }
            }])
          },
          complete: () => {
            var scopesId = this.toShow.scopes.flatMap((x: Scope) => {
              return x.id
            })
            this.classSrv.getAllByScopes(this.classId).subscribe(
              x => {
                this.suggestedClassRooms = x
              }
            )
          }
        }
      )
    })

    this.publicSrv.getPublicClass
  }

  joinClassRoom() {
    if ((this.user instanceof Student) && !this.member) {
      let done = false;
      this.studentSrv.joinClass(this.classId).subscribe({
        next: () => {
          done = true;
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          if (done && this.user instanceof Student) {
            this.user.memberOf?.push(
              new ClassInStudent(this.classId, this.toShow.title)
            );
            this.authSrv.updateLocalUser(this.user);
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

  classRoomPage() {
    this.router.navigate([{
      outlets: {
        content: ['class', this.classId]
      }
    }])
  }

  navigate(classId: Number) {
    this.router.navigate([{
      outlets: {
        primary: ['sidebar'],
        content: ['classRoomPresentation', classId]
      }
    }])
  }

}
