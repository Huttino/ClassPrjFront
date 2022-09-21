import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LOGGED_USER, TOKEN } from 'src/app/Model/Constants/Constants';
import { UserLogInRequest } from 'src/app/Model/UserLoginRequest';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LocalstorageService } from 'src/app/Service/LocalStorageService/localstorage.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  password:String=""
  username:String=""
  constructor(
    public auth:AuthService,
    public local:LocalstorageService,
    public router:Router,
    public userService:UserService
  ) {
   }

  ngOnInit(): void {
    this.auth.logout()
  }

  login(){
    let request =new UserLogInRequest(this.username,this.password)
    this.auth.login(request).subscribe(x=>{
      this.local.set(TOKEN,x.accesstoken)
      this.userService.getMe(x.accesstoken).subscribe(y=>{
        this.local.setObject(LOGGED_USER,y)
      })

    },(e)=>{
      if(e.status==401){
        alert("Bad Credentials")
      }
      else {
        alert("Error in the system")
      }
    },()=>{
      this.router.navigate(["sidebar"])
    }
    )
  }
}
