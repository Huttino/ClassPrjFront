import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserLogInRequest } from "../Model/UserLoginRequest";
import { UserRegistrationRequest } from "../Model/UserRegistrationRequest";

@Injectable({providedIn: 'root'})
export class AuthRepository{
  url:string ="http://localhost:8080/api/auth/"
  constructor(
    public http:HttpClient
  ){

  }
  registration(registrationRequest:UserRegistrationRequest):Observable<any>{
    return this.http.post<UserRegistrationRequest>(this.url+"signup",registrationRequest)
  }
  login(loginRequest:UserLogInRequest):Observable<any>{
    return this.http.post<UserLogInRequest>(this.url+"signin",loginRequest)
  }
}
