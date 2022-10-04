import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { ClassRoomRepository } from 'src/app/Repository/ClassRoomRepository';
import { LocalstorageService } from '../LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  url:string ="http://localhost:8080/api/class/"
  constructor(
    private classRepo:ClassRoomRepository,
    private local:LocalstorageService
  ) { }



  getClass(id:number){
    return this.classRepo.get(id,this.local.get(TOKEN)+"")
  }
  createClass(className:string):Observable<ClassRoom>{
    return this.classRepo.post(className,this.local.get(TOKEN)+"")
  }
  deleteClass(id:number){
    return this.classRepo.delete(id,this.local.get(TOKEN)+"")
  }
}
