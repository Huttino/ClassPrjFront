import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Student, Teacher, User } from 'src/app/Model/User';
import { AuthService } from '../../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscribedGuard implements CanActivate {
  public user!: Teacher | Student
  constructor(
    private auth: AuthService,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.auth.loggedUser().subscribe(
      x => {
        this.user = x
      }
    )
    if (this.user.authority === "STUDENT") {
      return ((this.user as Student).memberOf.find(x => {
        x.id == (route.paramMap.get('cod') as unknown as number)
      }) != undefined)
    }
    else {
      return ((this.user as Teacher).hasCreated.find(x => {
        x.id == (route.paramMap.get('cod') as unknown as number)
      }) != undefined)
    }
  }

}
