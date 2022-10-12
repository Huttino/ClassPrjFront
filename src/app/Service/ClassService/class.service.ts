import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddStudentRequest } from 'src/app/Model/AddStudentRequest';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { RemoveFromCLassRequest } from 'src/app/Model/RemoveFromClassRequest';
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

  RemoveFromClass(request:RemoveFromCLassRequest) {
    return this.classRepo.RemoveFromClass(request,this.local.get(TOKEN)+"")
  }
  AddToClass(request:AddStudentRequest){
    return this.classRepo.AddUser(request,this.local.get(TOKEN)+"")
  }
  GetClass(id:number){
    return this.classRepo.Get(id,this.local.get(TOKEN)+"")
  }
  CreateClass(className:string):Observable<ClassRoom>{
    return this.classRepo.Post(className,this.local.get(TOKEN)+"")
  }
  DeleteClass(id:number){
    return this.classRepo.Delete(id,this.local.get(TOKEN)+"")
  }
  GetAllClasses(){
    return this.classRepo.GetAll(this.local.get(TOKEN)+"")
  }
  GetMyClasses(myId:number){
    return this.classRepo.GetMy(myId,this.local.get(TOKEN)+"")
  }

}
