import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit{

  public loggedUser!:User
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

     }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.userService.getMe().subscribe(x=>{
      this.loggedUser=x as User
    });
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
