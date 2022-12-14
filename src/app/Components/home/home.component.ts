import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { Student, Teacher, User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { ClassService } from 'src/app/Service/ClassService/class.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public myClasses: ClassRoom[]= []
  public user!: Student|Teacher
  public newClassName: string = ''
  constructor(
    public auth: AuthService,
    public meSrv: UserService,
    public classSrv: ClassService,
    public router: Router
  ) {

  }

  ngOnInit(): void {
    this.auth.loggedUser().subscribe(
      x=>{
      if(x.authority==="STUDENT")
        this.user=new Student(x.id,x.username,x.firstName,x.lastName,x.authority,(x as Student).memberOf)
      else(this.user=new Teacher(x.id,x.username,x.firstName,x.lastName,x.authority,(x as Teacher).hasCreated))
      }
    )
    if (this.user instanceof Teacher && this.user.hasCreated) {
      this.classSrv.GetMyClasses(this.user.id).subscribe({
        next:(x) => {
          console.log(x)
          this.myClasses = x.sort((a,b)=>{
            if(a.className.toLowerCase()>b.className.toLowerCase())
            return 1
            else if(a.className.toLowerCase()<b.className.toLowerCase())
            return -1
            else return 0
          })

      },error:()=>{
        alert("error Loading your Classes")
      }
    })
    }
  }

  createClass() {
    this.classSrv.CreateClass(this.newClassName).subscribe({
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


  classNavigate(classid: number) {
    this.router.navigate([{
      outlets: {
        content: ['class', classid]
      }
    }])
  }
}
