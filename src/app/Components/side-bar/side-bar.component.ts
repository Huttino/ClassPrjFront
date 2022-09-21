import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOGGED_USER } from 'src/app/Model/Constants/Constants';
import { Student } from 'src/app/Model/Student';
import { Teacher } from 'src/app/Model/Teacher';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LocalstorageService } from 'src/app/Service/LocalStorageService/localstorage.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public loggedUser!:Student|Teacher
  Links=[
    {title:"Home",fragment:'home'},
    {title:"Profile",fragment:'profile'},
    {title:"My Classes",fragment:'taskview'}
  ]
  constructor(
    public router:RouterLink,
    public auth:AuthService
    ) {
      this.loggedUser=this.auth.loggedUser()
     }

  ngOnInit(): void {

  }

  navigateTo(link : any){

  }
}
