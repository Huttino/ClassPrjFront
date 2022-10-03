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
    this.user=this.auth.loggedUser()
   }

  ngOnInit(): void {

  }

  createClass(){
    this.classSrv.createClass(this.newClassName).subscribe(x=>{
      this.auth.addClass(x)
      this.router.navigate([{
        outlets:{
          content:['class',x.id]
        }
      }])
    },()=>{
      alert("error in creating class")
    },()=>{

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
