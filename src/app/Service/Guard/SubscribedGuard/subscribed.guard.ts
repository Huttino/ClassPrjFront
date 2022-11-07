import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
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
    private router: Router
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
    if (this.user.authority === 'STUDENT') {
      if ((this.user as Student).memberOf.some(x => x.id == +(route.paramMap.get('cod') + ''))) {
        return true
      }
      else {
        this.router.navigate([{
          outlets: {
            primary: ['sidebar'],
            content: ['home']
          }
        }])
        return false
      }
    }
    else {
      if ((this.user as Teacher).hasCreated.some(x => x.id == +(route.paramMap.get('cod') + ''))) return true
      else {
        this.router.navigate([{
          outlets: {
            primary: ['sidebar'],
            content: ['home']
          }
        }])
        return false
      }
    }
  }

}
