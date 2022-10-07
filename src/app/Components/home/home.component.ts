import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router, RouterLink } from '@angular/router';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { ClassService } from 'src/app/Service/ClassService/class.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public myClasses:ClassRoom[]|null=[]
  public user!:User
  public newClassName:string=''
  constructor(
    public auth:AuthService,
    public meSrv:UserService,
    public classSrv:ClassService,
    public router:Router
  ) {

   }

  ngOnInit(): void {
    this.user=this.auth.loggedUser()
    if(this.user.hasCreated)
    this.myClasses=this.user.hasCreated.sort((a,b)=>{
      if(a.className.toLowerCase()>b.className.toLowerCase())
      return 1
      else if(a.className.toLowerCase()<b.className.toLowerCase())
      return -1
      else return 0
    })
  }

  createClass(){
    this.classSrv.createClass(this.newClassName).subscribe({
      next:(x)=>{
      this.auth.addClass(x)
      this.router.navigate([{
        outlets:{
          content:['class',x.id]
        }
      }])
    },
    error:()=>{
      alert("error in creating class")
    },
    complete:()=>{

    }
  })

  }


  classNavigate(classid:number){
    this.router.navigate([{
      outlets:{
        content:['class',classid]
      }
    }])
  }
}
