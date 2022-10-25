import { Injectable } from '@angular/core';
import { uploadVideoLessonRequest } from 'src/app/Model/uploadVideoLessonRequest';
import { ClassRoomRepository } from 'src/app/Repository/ClassRoomRepository';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VideoLessonService {

  constructor(
    private classRoomRepo:ClassRoomRepository,
    private auth:AuthService
  ) { }

  postLesson(request:uploadVideoLessonRequest,classId:number){
    return this.classRoomRepo.addLesson(classId,this.auth.getJWTToken(),request)
  }

  deleteLesson(classId:number,lessonId:number){
    return this.classRoomRepo.removeLesson(classId,this.auth.getJWTToken(),lessonId)
  }
}
