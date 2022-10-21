import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGGED_USER, TOKEN } from 'src/app/Model/Constants/Constants';
import { UserRegistrationRequest } from 'src/app/Model/UserRegistrationRequest';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LocalstorageService } from 'src/app/Service/LocalStorageService/localstorage.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  username: string = ""
  password: string = ""
  firstName: string = ""
  lastName: String = ""
  constructor(
    public auth: AuthService,
    public local: LocalstorageService,
    public router: Router,
    public userService: UserService
  ) {

  }

  ngOnInit(): void {
    this.auth.logout()
  }

  register() {
    let request = new UserRegistrationRequest(this.username, this.password, this.firstName, this.lastName)
    this.auth.registration(request).subscribe(
      {
        next: (x) => {
          this.local.set(TOKEN, x.accessToken)

        },
        error: (e) => {
          alert("Error in registration : check all the fields")
        },
        complete: () => {
          this.userService.getMe().subscribe(
            {
              next: (y) => {
                this.local.setObject(LOGGED_USER, y)
              }, error: () => { },
              complete: () => {
                this.router.navigate([
                  {
                    outlets: {
                      primary: ['sidebar'],
                      content: ['home'],
                    },
                  },
                ]);
              }
            })
        }
      })
  }
}
