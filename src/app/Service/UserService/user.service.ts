import { Injectable } from '@angular/core';
import { PasswordUpdateRequest } from 'src/app/Model/PasswordUpdateRequest';
import { UserUpdateRequest } from 'src/app/Model/UserUpdateRequest';
import { UserRepository } from 'src/app/Repository/UserRepository';
import { AuthService } from '../AuthService/auth.service';

import { UserRefresherService } from '../UserRefresherService/user-refresher.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(
    private userRepo: UserRepository,
    private authService: AuthService,
    private userRefreshSrv: UserRefresherService
  ) { }

  getMe() {
    return this.userRepo.getMe(this.authService.getJWTToken())
  }

  getMyClasses() {
    return this.userRepo.getMyClasses(this.authService.getJWTToken())
  }

  updateMe(updateRequest: UserUpdateRequest) {
    return this.userRepo.updateMe(updateRequest, this.authService.getJWTToken())
  }
  updatePassword(updatePasswordRequest: PasswordUpdateRequest) {
    return this.userRepo.updatePassword(updatePasswordRequest, this.authService.getJWTToken())
  }
}
