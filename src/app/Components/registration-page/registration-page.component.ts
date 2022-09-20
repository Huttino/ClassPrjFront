import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { UserRegistrationRequest } from 'src/app/Model/UserRegistrationRequest';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LocalstorageService } from 'src/app/Service/LocalStorageService/localstorage.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  username:string=""
  password:string=""
  firstName:string=""
  lastName:String=""
  constructor(
    public auth:AuthService,
    public local:LocalstorageService,
    public router:Router
  ) {

   }

  ngOnInit(): void {
    this.auth.logout()
  }

  register(){
    let request =new UserRegistrationRequest(this.username,this.password,this.firstName,this.lastName)
    this.auth.registration(request).subscribe(x=>{
      this.local.set(TOKEN,x.accesstoken)
      console.log(x.accesstoken)
      this.router.navigate(['/home'])
    },(e)=>{
      alert(e.getMessage)
    })
  }
}
