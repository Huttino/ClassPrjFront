import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClassRoom } from "../Model/ClassRoom";
import { User } from "../Model/User";

@Injectable({providedIn:'root'})
export class UserRepository{
  url:string ="http://localhost:8080/api/me/"
  constructor(
    private http:HttpClient
  ){}

  getMe(token:string){
    return this.http.get<User>(this.url,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }

  getMyClasses(token:string){
    return this.http.get<ClassRoom[]>(this.url+"classRooms",{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
}
