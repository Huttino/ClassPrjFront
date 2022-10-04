import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClassRoom } from "../Model/ClassRoom";
import { User } from "../Model/User";

@Injectable({providedIn:'root'})
export class UserRepository{
  urlme:string ="http://localhost:8080/api/me/"
  urlclass:string="http://localhost:8080/api/me/classRoom/"
  constructor(
    private http:HttpClient
  ){}

  getMe(token:string){
    return this.http.get<User>(this.urlme,{
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
}
