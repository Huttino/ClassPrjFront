import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{
  public myClasses:ClassRoom[]=[]
  public user!:User
  Links=[
    {title:"Home",fragment:'home'},
    {title:"Profile",fragment:'profile'},
    {title:"All Classes",fragment:'ViewClasses'}
  ]
  constructor(
    public router:RouterLink,
    public auth:AuthService,
    public userService:UserService,
    public router2:Router
    ) {
      this.user=this.auth.loggedUser()
      console.log(this.user)
      if(this.auth.loggedUser().authorities && this.auth.loggedUser().authorities.includes('STUDENT')){
        this.userService.getMyClasses().subscribe(x=>{
          this.myClasses=x
        })}
     }

  ngOnInit(): void {

  }
  logout(){
    this.router2.navigate([{
      outlets:{
        primary:['login'],
        content:null
      }
    }])
  }
}
