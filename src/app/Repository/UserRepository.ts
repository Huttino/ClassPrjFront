import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClassRoom } from "../Model/ClassRoom";
import { PasswordUpdateRequest } from "../Model/PasswordUpdateRequest";
import { Student, Teacher, User } from "../Model/User";
import { UserUpdateRequest } from "../Model/UserUpdateRequest";

@Injectable({providedIn:'root'})
export class UserRepository{
  urlme:string ="http://localhost:8080/api/me/"
  urlclass:string="http://localhost:8080/api/me/classRoom/"
  constructor(
    private http:HttpClient
  ){}

  getMe(token:string):Observable<Student|Teacher>{
    return this.http.get<Student|Teacher>(this.urlme,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }

  getMyClasses(token:string){
    return this.http.get<ClassRoom[]>(this.urlclass,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }

  join(classid:number,token:string){
    return this.http.put<any>(this.urlclass+classid,null,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }

  leave(classid:number,token:string){
    return this.http.delete(this.urlclass+classid,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }

  updateMe(updateRequest:UserUpdateRequest,token:string){
    return this.http.put(this.urlme,updateRequest,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
  updatePassword(updatePasswordRequest:PasswordUpdateRequest,token:string){
    return this.http.put(this.urlme+"password",updatePasswordRequest,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
}
