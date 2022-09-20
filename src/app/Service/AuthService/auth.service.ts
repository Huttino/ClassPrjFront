import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalstorageService } from '../LocalStorageService/localstorage.service';
import { UserLogInRequest } from 'src/app/Model/UserLoginRequest';
import { Observable } from 'rxjs';
import { UserRegistrationRequest } from 'src/app/Model/UserRegistrationRequest';
import { LOGGED_USER, TOKEN } from 'src/app/Model/Constants/Constants';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor(private httpClient: HttpClient) { }

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string ="http://localhost:8080/api/auth/"

  constructor(
    private http:HttpClient,
    private local:LocalstorageService,
  ) { }

  login(loginRequest:UserLogInRequest):Observable<any>{
    return this.http.post<UserLogInRequest>(this.url+"signin",loginRequest)
  }

  registration(registrationRequest:UserRegistrationRequest):Observable<any>{
    return this.http.post<UserRegistrationRequest>(this.url+"signup",registrationRequest)
  }
  logout(){
    this.local.remove(LOGGED_USER)
    this.local.remove(TOKEN)
  }
}
