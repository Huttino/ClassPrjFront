import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { ClassService } from 'src/app/Service/ClassService/class.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public me?:User
  constructor(
    public Auth:AuthService
  ) { }

  ngOnInit(): void {
    this.me=this.Auth.loggedUser()

  }

}
