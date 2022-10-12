import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddStudentRequest } from "../Model/AddStudentRequest";
import { ClassRoom } from "../Model/ClassRoom";
import { RemoveFromCLassRequest } from "../Model/RemoveFromClassRequest";
import { StudentInClass } from "../Model/StudentInClass";
import { UpdateGradeRequest } from "../Model/UpdateGradeRequest";

@Injectable({providedIn: 'root'})
export class ClassRoomRepository{


  url:string ="http://localhost:8080/api/class/"
  constructor(
    public http:HttpClient
  ){

  }

  RemoveFromClass(request:RemoveFromCLassRequest,token:string) {
    return this.http.patch(this.url,request,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
  Post(className:string,token:string):Observable<ClassRoom>{
    return this.http.post<ClassRoom>(this.url,{classname:className},{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }

  Get(id:number,token:string):Observable<ClassRoom>{
    return this.http.get<ClassRoom>(this.url+id,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
  Delete(id:number,token:string):Observable<any>{
    return this.http.delete(this.url+id,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }
  GetAll(token:string):Observable<ClassRoom[]>{
    return this.http.get<ClassRoom[]>(this.url,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }
  AddUser(request:AddStudentRequest,token:String):Observable<StudentInClass>{
    return this.http.put<StudentInClass>(this.url,request,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
  GetMy(myId:number,token:String):Observable<ClassRoom[]> {
    return this.http.get<ClassRoom[]>(this.url+"creator/"+myId,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
  assignGrade(classId:number,token:String,request:UpdateGradeRequest){
    return this.http.patch(this.url+classId,request,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
}
