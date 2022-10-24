import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../LocalStorageService/localstorage.service';
import { UserLogInRequest } from 'src/app/Model/UserLoginRequest';
import { Observable, of } from 'rxjs';
import { UserRegistrationRequest } from 'src/app/Model/UserRegistrationRequest';
import { LOGGED_USER, TOKEN } from 'src/app/Model/Constants/Constants';
import { Student, Teacher, User } from 'src/app/Model/User';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { AuthRepository } from 'src/app/Repository/AuthRepository';
import { AuthToken } from 'src/app/Model/AuthToken';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  constructor() {}
}
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  constructor(
    private local: LocalstorageService,
    private repo: AuthRepository,
    private router: Router
  ) {}

  login(loginRequest: UserLogInRequest): Observable<AuthToken> {
    return this.repo.login(loginRequest);
  }

  registration(
    registrationRequest: UserRegistrationRequest
  ): Observable<AuthToken> {
    return this.repo.registration(registrationRequest);
  }

  logout() {
    this.local.remove(LOGGED_USER);
    this.local.remove(TOKEN);
  }

  loggedUser(): Observable<Student|Teacher> {
    return of(this.local.getObject(LOGGED_USER) );
  }

  addClass(newClass: ClassRoom) {
    let toUpdate: Teacher = this.local.getObject(LOGGED_USER);
    toUpdate.hasCreated?.push(newClass);
    this.local.setObject(LOGGED_USER, toUpdate);
  }

  updateLocalUser(user: Student|Teacher) {
    this.local.setObject(LOGGED_USER, user);
  }

  getJWTToken():string {
    const token = this.local.get(TOKEN)
    if (token == null || token.length<1) {
      this.router.navigate([
        {
          outlets: {
            primary: ['login'],
            content: [],
          },
        },
      ]);
    }
    return token as string
  }
}
