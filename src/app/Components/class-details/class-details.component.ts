import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { ClassService } from 'src/app/Service/ClassService/class.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from 'src/app/Service/DocumentService/document.service';
import { UploadDocumentWithData } from 'src/app/Model/UploadDocumentWithData';
import {saveAs} from 'file-saver';
import { UserService } from 'src/app/Service/UserService/user.service';
import { ClassInStudent } from 'src/app/Model/ClassInStudent';
import { StudentInClass } from 'src/app/Model/StudentInClass';
import { DocumentDTO } from 'src/app/Model/DocumentDTO';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  public classid:number=0
  public user!:User
  public class!:ClassRoom
  public filesToUpload:File[]=[]
  public notes:string=''
  public creator:boolean=false
  public member:boolean=false
  constructor(
    public route:ActivatedRoute,
    public router:Router,
    public ClassSrv:ClassService,
    public auth:AuthService,
    public modalService:NgbModal,
    public userSrv:UserService,
    public documentSrv:DocumentService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
      this.classid=+(params.get('cod')+'')
      this.ClassSrv.getClass(this.classid).subscribe(
        (x)=>{
          this.class=x
        },()=>{
        },()=>{
          this.user=this.auth.loggedUser()
          if (this.user.hasCreated?.find((x)=>{
            return x.id==this.classid
          })
          ){
            this.creator=true
          }
          else if(this.user.memberOf?.find((x)=>{
            return x.id==this.classid
          })){
            this.member=true
          }
        }
      )
    })

  }

  handleFileInput(fileInputEvent:Event){
    let event=fileInputEvent.target as HTMLInputElement
    if(event.files)
    this.filesToUpload.push(event.files[0])
    console.log(this.filesToUpload)
  }

  openFileUpdate(content: any){
    this.modalService.open(content, { centered: true });
  }
  remove(filename:File){

    this.filesToUpload.splice(this.filesToUpload.indexOf(filename),1)
  }
  uploadFiles(){
    if(this.creator){
      this.documentSrv.uploadDocument(new UploadDocumentWithData(this.filesToUpload,this.notes),this.classid).subscribe(
        x=>{
          this.class.uploadedDocuments?.concat(x)
        })
    }

  }
  download(id:number,filename:string){
    if(this.member||this.creator){
      this.documentSrv.downloadDocument(id).subscribe(blob=>{
        saveAs(blob,filename)
      })
    }

  }
  closeClassRoom(){
    if(confirm("You are closing the class Room and all the file uploaded will be lost. Confirm?")){
      let done=false
      this.ClassSrv.deleteClass(this.classid).subscribe(
        ()=>{done=true},
        (e)=>{alert("couldn't close the classroom")},
        ()=>{
          if (done){
            this.user.hasCreated?.splice(this.user.hasCreated.findIndex(x=>{x.id==this.classid}),1)
            this.auth.updateLocalUser(this.user)
            this.router.navigate([{
              outlets:{
                primary:['sidebar'],
                content:['home']
              }
            }])
          }
        }
      )
    }
  }
  joinClassRoom(){
    if(!this.member&&!this.creator&&!this.user.authorities.includes("TEACHER")){
      let done=false
      this.userSrv.joinClass(this.classid).subscribe(
        ()=>{done=true},
        (e)=>{console.log(e)},
        ()=>{
          if(done){
            this.user.memberOf?.push(new ClassInStudent(this.classid,this.class.className))
            this.class.members?.push(new StudentInClass(this.user.id,this.user.username))
            this.auth.updateLocalUser(this.user)
            this.member=true
          }
        }
      )
    }
    else{
      alert("You can't join this Class")
    }
  }

  leaveClassRoom(){
    if(this.member&&!this.creator&&!this.user.authorities.includes("TEACHER")){
      let done=false
      this.userSrv.leaveClass(this.classid).subscribe(
        ()=>{done=true},
        (e)=>{alert(e.message)},
        ()=>{
          if(done){
            this.user.memberOf?.splice(this.user.memberOf.findIndex(x=>{x.id==this.classid}),1)
            this.class.members?.splice(this.class.members.findIndex(x=>{x.id==this.user.id}))
            this.auth.updateLocalUser(this.user)
            this.member=false
          }
        }
      )
    }
  }

}
