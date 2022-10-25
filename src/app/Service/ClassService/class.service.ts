import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddStudentRequest } from 'src/app/Model/AddStudentRequest';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { RemoveFromCLassRequest } from 'src/app/Model/RemoveFromClassRequest';
import { UpdateGradeRequest } from 'src/app/Model/UpdateGradeRequest';
import { ClassRoomRepository } from 'src/app/Repository/ClassRoomRepository';
import { AuthService } from '../AuthService/auth.service';
import { LocalstorageService } from '../LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  url:string ="http://localhost:8080/api/class/"
  constructor(
    private classRepo:ClassRoomRepository,
    private authService:AuthService
  ) { }

  RemoveFromClass(request:RemoveFromCLassRequest) {
    return this.classRepo.RemoveFromClass(request,this.authService.getJWTToken())
  }
  AddToClass(request:AddStudentRequest){
    return this.classRepo.AddUser(request,this.authService.getJWTToken())
  }
  GetClass(id:number){
    return this.classRepo.Get(id,this.authService.getJWTToken())
  }
  CreateClass(className:string):Observable<ClassRoom>{
    return this.classRepo.Post(className,this.authService.getJWTToken())
  }
  DeleteClass(id:number){
    return this.classRepo.Delete(id,this.authService.getJWTToken())
  }
  GetAllClasses(){
    return this.classRepo.GetAll(this.authService.getJWTToken())
  }
  GetMyClasses(myId:number){
    return this.classRepo.GetMy(myId,this.authService.getJWTToken())
  }
  AssignGrade(classId:number,request:UpdateGradeRequest){
    return this.classRepo.assignGrade(classId,this.authService.getJWTToken(),request)
  }
}
