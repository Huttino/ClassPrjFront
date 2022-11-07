import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOGGED_USER, TOKEN } from 'src/app/Model/Constants/Constants';
import { User } from 'src/app/Model/User';
import { UserRegistrationRequest } from 'src/app/Model/UserRegistrationRequest';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LocalstorageService } from 'src/app/Service/LocalStorageService/localstorage.service';
import { UserRefresherService } from 'src/app/Service/UserRefresherService/user-refresher.service';
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
  lastName: string = ""
  constructor(
    public auth: AuthService,
    public local: LocalstorageService,
    public router: Router,
    public userService: UserService,
    public userRefresh: UserRefresherService
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
              next: x => {
                this.local.setObject(LOGGED_USER, x as User)
              }, complete: () => {
                this.userRefresh.startObservingMe()
                this.router.navigate([
                  {
                    outlets: {
                      primary: ['sidebar'],
                      content: ['home'],
                    }
                  }
                ]);
              }
            })
        }
      })
  }
}
