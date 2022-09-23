import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LOGGED_USER, TOKEN } from 'src/app/Model/Constants/Constants';
import { User } from 'src/app/Model/User';
import { UserLogInRequest } from 'src/app/Model/UserLoginRequest';
import { AuthService } from 'src/app/Service/AuthService/auth.service';
import { LocalstorageService } from 'src/app/Service/LocalStorageService/localstorage.service';
import { UserService } from 'src/app/Service/UserService/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  password: String = '';
  username: String = '';
  loggedUser!: User;
  constructor(
    public auth: AuthService,
    public local: LocalstorageService,
    public router: Router,
    public userService: UserService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.auth.logout();
  }

  login() {
    let request = new UserLogInRequest(this.username, this.password);
    this.auth.login(request).subscribe(
      (x) => {
        this.local.set(TOKEN, x.accesstoken);
        this.userService.getMe().subscribe((y) => {
          this.local.setObject(LOGGED_USER, y as User);
        });
        this.router.navigate([
          {
            outlets: {
              primary: ['sidebar'],
              content: ['home'],
            },
          },
        ]);
      },
      (e) => {
        if (e.status == 401) {
          alert('Bad Credentials');
        } else {
          alert('Error in the system');
        }
      }
    );
  }
}
