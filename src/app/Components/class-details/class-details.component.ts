import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { ClassService } from 'src/app/Service/ClassService/class.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from 'src/app/Service/DocumentService/document.service';
import { UploadDocumentWithData } from 'src/app/Model/UploadDocumentWithData';
import {saveAs} from 'file-saver';

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
  constructor(
    public route:ActivatedRoute,
    public ClassSrv:ClassService,
    public auth:AuthService,
    public modalService:NgbModal,
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
    this.documentSrv.uploadDocument(new UploadDocumentWithData(this.filesToUpload,this.notes),this.classid).subscribe()
  }
  download(id:number,filename:string){
    this.documentSrv.downloadDocument(id).subscribe(blob=>{
      saveAs(blob,filename)
    })
  }
}
