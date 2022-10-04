import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../LocalStorageService/localstorage.service';
import { UserLogInRequest } from 'src/app/Model/UserLoginRequest';
import { Observable } from 'rxjs';
import { UserRegistrationRequest } from 'src/app/Model/UserRegistrationRequest';
import { LOGGED_USER, TOKEN } from 'src/app/Model/Constants/Constants';
import { User } from 'src/app/Model/User';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { AuthRepository } from 'src/app/Repository/AuthRepository';


@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor() { }

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private local:LocalstorageService,
    private repo:AuthRepository
  ) { }

  login(loginRequest:UserLogInRequest):Observable<any>{
    return this.repo.login(loginRequest)
  }

  registration(registrationRequest:UserRegistrationRequest):Observable<any>{
    return this.repo.registration(registrationRequest)
  }
  logout(){
    this.local.remove(LOGGED_USER)
    this.local.remove(TOKEN)
  }
  loggedUser():User{
    return this.local.getObject(LOGGED_USER)
  }
  addClass(newClass:ClassRoom){
    let toUpdate:User=this.local.getObject(LOGGED_USER)
    toUpdate.hasCreated?.push(newClass)
    this.local.setObject(LOGGED_USER,toUpdate)
  }
  updateLocalUser(user:User){
    this.local.setObject(LOGGED_USER,user)
  }

}
