import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { LocalstorageService } from '../LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  url:string ="http://localhost:8080/api/class/"
  constructor(
    private http:HttpClient,
    private local:LocalstorageService
  ) { }

  getClass(id:number):Observable<ClassRoom>{
    return this.http.get<ClassRoom>(this.url+id,{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.local.get(TOKEN)}`
      }
    })
  }
}
