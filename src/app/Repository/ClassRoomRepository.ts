import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClassRoom } from "../Model/ClassRoom";

@Injectable({providedIn: 'root'})
export class ClassRoomRepository{
  url:string ="http://localhost:8080/api/class/"
  constructor(
    public http:HttpClient
  ){

  }
  postClass(className:string,token:string):Observable<ClassRoom>{
    return this.http.post<ClassRoom>(this.url,{classname:className},{
      headers:{
        'Content-Type':'form-data',
        'Authorization':`Bearer ${token}`
      }
    })
  }

  getClass(id:number,token:string):Observable<ClassRoom>{
    return this.http.get<ClassRoom>(this.url+id,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
}
