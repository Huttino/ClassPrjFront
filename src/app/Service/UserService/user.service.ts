import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { User } from 'src/app/Model/User';

import { LocalstorageService } from '../LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string ="http://localhost:8080/api/me/"

  constructor(
    private http:HttpClient,
    private local:LocalstorageService,
  ) { }

  getMe(){
    return this.http.get<User>(this.url,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.local.get(TOKEN)}`
      }
    })
  }

  getMyClasses(){
    return this.http.get<ClassRoom[]>(this.url+"classRooms",{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.local.get(TOKEN)}`
      }
    })
  }
}
