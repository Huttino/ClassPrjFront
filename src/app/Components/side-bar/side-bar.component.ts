import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { Student, Teacher, User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public user!: Student | Teacher
  Links = [
    { title: "Home", fragment: 'home' },
    { title: "Profile", fragment: 'profile' },
    { title: "All Classes", fragment: 'classList' },
    { title: "Chat", fragment: 'chat' }
  ]
  constructor(
    public router: RouterLink,
    public auth: AuthService,
    public userService: UserService,
    public router2: Router
  ) {
    this.auth.loggedUser().subscribe(
      x => {
        if (x.authority === "STUDENT")
          this.user = new Student(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Student).memberOf)
        else (this.user = new Teacher(x.id, x.username, x.firstName, x.lastName, x.authority, (x as Teacher).hasCreated))
      }
    ).unsubscribe()
  }

  ngOnInit(): void {

  }
  logout() {
    this.router2.navigate([{
      outlets: {
        primary: ['login'],
        content: null
      }
    }])
  }
}
