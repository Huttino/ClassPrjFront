import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AddStudentRequest } from "../Model/AddStudentRequest";
import { ClassRoom, ClassRoomStripped, PublicClassRoom } from "../Model/ClassRoom";
import { NewClassRoomRequest } from "../Model/NewClassRoomRequest";
import { RemoveFromCLassRequest } from "../Model/RemoveFromClassRequest";
import { ScopeFilter } from "../Model/Scope";
import { StudentInClass } from "../Model/StudentInClass";
import { UpdateGradeRequest } from "../Model/UpdateGradeRequest";
import { uploadVideoLessonRequest } from "../Model/uploadVideoLessonRequest";
import { VideoLesson } from "../Model/VideoLesson";

@Injectable({ providedIn: 'root' })
export class ClassRoomRepository {


  url: string = "http://localhost:8080/api/class/"
  constructor(
    public http: HttpClient
  ) {

  }

  RemoveFromClass(request: RemoveFromCLassRequest, token: string) {
    return this.http.patch(this.url, request, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
  Post(request: NewClassRoomRequest, token: string): Observable<ClassRoom> {
    return this.http.post<ClassRoom>(this.url, request, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }

  Get(id: number, token: string): Observable<ClassRoom> {
    return this.http.get<ClassRoom>(this.url + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
  Delete(id: number, token: string): Observable<any> {
    return this.http.delete(this.url + id, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  GetAll(token: string): Observable<ClassRoomStripped[]> {
    return this.http.get<ClassRoomStripped[]>(this.url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  AddUser(request: AddStudentRequest, token: string): Observable<StudentInClass> {
    return this.http.put<StudentInClass>(this.url, request, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
  GetMy(myId: number, token: string): Observable<ClassRoom[]> {
    return this.http.get<ClassRoom[]>(this.url + "creator/" + myId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
  assignGrade(classId: number, token: string, request: UpdateGradeRequest) {
    return this.http.patch(this.url + classId, request, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
  addLesson(classId: number, token: string, request: uploadVideoLessonRequest): Observable<VideoLesson> {
    return this.http.post<VideoLesson>(this.url + classId + '/lesson', request, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
  removeLesson(classId: number, token: string, lessonId: number) {
    return this.http.delete(this.url + classId + '/lesson/' + lessonId, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  getAllByScopes(classId: number, token: string): Observable<PublicClassRoom[]> {
    return this.http.get<PublicClassRoom[]>(this.url + 'recommendation/' + classId, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  updateCover(data: FormData, token: string, classId: number) {
    return this.http.patch(this.url + classId + '/cover', data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
