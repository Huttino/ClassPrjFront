import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthToken } from "../Model/AuthToken";
import { UserLogInRequest } from "../Model/UserLoginRequest";
import { UserRegistrationRequest } from "../Model/UserRegistrationRequest";

@Injectable({providedIn: 'root'})
export class AuthRepository{
  url:string ="http://localhost:8080/api/auth/"
  constructor(
    public http:HttpClient
  ){

  }
  registration(registrationRequest:UserRegistrationRequest):Observable<AuthToken>{
    return this.http.post<AuthToken>(this.url+"signup",registrationRequest)
  }
  login(loginRequest:UserLogInRequest):Observable<AuthToken>{
    return this.http.post<AuthToken>(this.url+"signin",loginRequest)
  }
}
