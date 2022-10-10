import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
[x: string]: any;
  public me!:User
  public teacher=false;
  public choice!:number
  public images=[
    ('../../../assets/506134.png'),
    ('../../../assets/2922506.png'),
    ('../../../assets/2995620.png'),
    ('../../../assets/3480535.png'),
    ('../../../assets/3480547.png'),
    ('../../../assets/4532513.png'),
    ('../../../assets/4696907.png'),
    ('../../../assets/4892710.png'),
    ('../../../assets/4892749.png')
  ]
  constructor(
    public Auth:AuthService
  ) {

   }

  ngOnInit(): void {
    this.me=this.Auth.loggedUser()
    console.log(this.me)
    if(this.me.authority&&this.me.authority=="TEACHER"){
      this.teacher=true
    }
    this.choice=Math.floor(Math.random()*8)
    let image:any=document.getElementById("image")
    image.src=this.images[this.choice]
  }

}
