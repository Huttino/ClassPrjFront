import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ClassInStudent } from 'src/app/Model/ClassInStudent';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { NewClassRoomRequest } from 'src/app/Model/NewClassRoomRequest';
import { Scope } from 'src/app/Model/Scope';
import { Student, Teacher, User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { ClassService } from 'src/app/Service/ClassService/class.service';
import { ScopeService } from 'src/app/Service/ScopeService/scope.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public myClasses: ClassRoom[] = []
  public myClassesStudent: ClassInStudent[] = []
  public user!: Student | Teacher
  public scopes$: Observable<Scope[]> | undefined
  public newClassRoomRequest: NewClassRoomRequest = new NewClassRoomRequest()
  public teacher = false
  public recommendedClasses = []
  constructor(
    public auth: AuthService,
    public meSrv: UserService,
    public classSrv: ClassService,
    public scopeSrv: ScopeService,
    public router: Router
  ) {
    this.auth.loggedUser().pipe(take(1)).subscribe(
      x => {
        if (x.authority === "STUDENT") {
          this.user = new Student(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Student).memberOf)
          this.myClassesStudent = (this.user as Student).memberOf
        }
        else {
          this.user = new Teacher(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Teacher).hasCreated)
          this.myClasses = (this.user as Teacher).hasCreated
          this.teacher = true
        }
      }
    )
    this.scopes$ = this.scopeSrv.getAllScopes()
  }

  select(event: MouseEvent, scopeId: number) {
    if (this.newClassRoomRequest.scopesId.includes(scopeId)) {
      this.newClassRoomRequest.scopesId.splice(this.newClassRoomRequest.scopesId.indexOf(scopeId), 1);
      (event.target as HTMLButtonElement).classList.remove('selected')
    }
    else {
      this.newClassRoomRequest.scopesId.push(scopeId);
      (event.target as HTMLButtonElement).classList.add('selected')
    }
  }

  createClass() {
    this.classSrv.CreateClass(this.newClassRoomRequest).pipe(take(1)).subscribe({
      next: (x) => {
        this.auth.addClass(x)
        this.router.navigate([{
          outlets: {
            content: ['class', x.id]
          }
        }])
      },
      error: () => {
        alert("error in creating class")
      }
    })

  }


  classNavigate(classid: number) {
    this.router.navigate([{
      outlets: {
        content: ['class', classid]
      }
    }])
  }
}
