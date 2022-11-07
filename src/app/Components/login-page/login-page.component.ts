import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { LOGGED_USER, TOKEN } from 'src/app/Model/Constants/Constants';
import { Student, Teacher, User } from 'src/app/Model/User';
import { UserLogInRequest } from 'src/app/Model/UserLoginRequest';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LocalstorageService } from 'src/app/Service/LocalStorageService/localstorage.service';
import { UserRefresherService } from 'src/app/Service/UserRefresherService/user-refresher.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  password: string = '';
  username: string = '';
  loggedUser!: Student | Teacher;
  constructor(
    public auth: AuthService,
    public local: LocalstorageService,
    public router: Router,
    public userService: UserService,
    public userRefresh: UserRefresherService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.auth.logout();
  }

  login() {
    let request = new UserLogInRequest(this.username, this.password);
    this.auth.login(request).subscribe({
      next: (x) => {
        this.local.set(TOKEN, x.accessToken)
      },
      error: (e) => {
        alert('Bad Credentials')

      }, complete: () => {
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
    }
    );
  }
}
