import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { UserLogInRequest } from 'src/app/Model/UserLoginRequest';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LocalstorageService } from 'src/app/Service/LocalStorageService/localstorage.service';

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
    public router:Router
  ) {
   }

  ngOnInit(): void {
    this.auth.logout()
  }

  login(){
    let request =new UserLogInRequest(this.username,this.password)
    this.auth.login(request).subscribe(x=>{
      this.local.set(TOKEN,x.accesstoken)
      this.router.navigate(["/home"])
    },(e)=>{
      if(e.status==401){
        alert("Bad Credentials")
      }
      else {
        alert("Error in the system")
      }
    }
    )
  }

}
