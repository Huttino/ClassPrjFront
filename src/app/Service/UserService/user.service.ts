import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { Student } from 'src/app/Model/Student';
import { Teacher } from 'src/app/Model/Teacher';
import { LocalstorageService } from '../LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string ="http://localhost:8080/api/me"

  constructor(
    private http:HttpClient,
    private local:LocalstorageService,
  ) { }

  getMe(){
    return this.http.get<Student|Teacher>(this.url,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.local.get(TOKEN)}`
      }
    })
  }
}
