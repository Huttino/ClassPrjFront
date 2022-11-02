import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
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
export class HomeComponent implements OnInit {

  public myClasses: ClassRoom[] = []
  public user!: Student | Teacher
  public scopes: Scope[] = []
  public newClassRoomRequest: NewClassRoomRequest = new NewClassRoomRequest()
  constructor(
    public auth: AuthService,
    public meSrv: UserService,
    public classSrv: ClassService,
    public scopeSrv: ScopeService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.auth.loggedUser().subscribe(
      x => {
        if (x.authority === "STUDENT")
          this.user = new Student(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Student).memberOf)
        else (this.user = new Teacher(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Teacher).hasCreated))
      }
    )
    if (this.user instanceof Teacher && this.user.hasCreated) {
      this.classSrv.GetMyClasses(this.user.id).subscribe({
        next: (x) => {
          console.log(x)
          this.myClasses = x.sort((a, b) => {
            if (a.className.toLowerCase() > b.className.toLowerCase())
              return 1
            else if (a.className.toLowerCase() < b.className.toLowerCase())
              return -1
            else return 0
          })

        }, error: () => {
          alert("error Loading your Classes")
        }
      })
    }
    this.scopeSrv.getAllScopes().subscribe(
      x => {
        console.log(x)
        this.scopes = x
      }
    )
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
    this.classSrv.CreateClass(this.newClassRoomRequest).subscribe({
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
      },
      complete: () => {

      }
    })

  }

  showDescription() {
    console.log(this.newClassRoomRequest.description)
  }


  classNavigate(classid: number) {
    this.router.navigate([{
      outlets: {
        content: ['class', classid]
      }
    }])
  }
}
