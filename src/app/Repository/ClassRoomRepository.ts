import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClassRoom } from "../Model/ClassRoom";
import { RemoveFromCLassRequest } from "../Model/RemoveFromClassRequest";

@Injectable({providedIn: 'root'})
export class ClassRoomRepository{

  url:string ="http://localhost:8080/api/class/"
  constructor(
    public http:HttpClient
  ){

  }

  removeFromClass(request:RemoveFromCLassRequest,token:string) {
    return this.http.patch(this.url,request,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
  post(className:string,token:string):Observable<ClassRoom>{
    return this.http.post<ClassRoom>(this.url,{classname:className},{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }

  get(id:number,token:string):Observable<ClassRoom>{
    return this.http.get<ClassRoom>(this.url+id,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
    })
  }
  delete(id:number,token:string):Observable<any>{
    return this.http.delete(this.url+id,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }
  getAll(token:string):Observable<ClassRoom[]>{
    return this.http.get<ClassRoom[]>(this.url,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    })
  }
}
