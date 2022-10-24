import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student, Teacher } from 'src/app/Model/User';
import { VideoLesson } from 'src/app/Model/VideoLesson';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LocalstorageService } from 'src/app/Service/LocalStorageService/localstorage.service';
@Component({
  selector: 'app-lesson-page',
  templateUrl: './lesson-page.component.html',
  styleUrls: ['./lesson-page.component.css']
})
export class LessonPageComponent implements OnInit,OnDestroy {
  selectedLesson!:VideoLesson
  apiLoaded=false
  constructor(
    public authService:AuthService,
    public local:LocalstorageService
  ) {
   }
  ngOnDestroy(): void {
    this.local.remove("currentLesson")
  }

  ngOnInit(): void {
    this.selectedLesson=this.local.getObject("currentLesson") as VideoLesson;
    console.log(this.selectedLesson)
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

}
