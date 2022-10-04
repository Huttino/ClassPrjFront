import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { LocalstorageService } from '../../LocalStorageService/localstorage.service';

import { GuardData } from './GuardData';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router:Router,
    private jwtHelper:JwtHelperService,
    private storage:LocalstorageService
    ){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isLogged=this.isAuthenticated()
      let ok:boolean=false
      if(isLogged){
        return true;
      }
      else this.router.navigate([{
        outlets:{
          primary:['login'],
          content:[]}
    }])
      return false
  }

  isAuthenticated():boolean{
    if(!this.storage.get(TOKEN)|| this.jwtHelper.isTokenExpired(this.storage.get(TOKEN)+"")){
      return false;
    }
    return true
  }

}
