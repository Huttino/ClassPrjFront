import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { PasswordUpdateRequest } from 'src/app/Model/PasswordUpdateRequest';
import { User } from 'src/app/Model/User';
import { UserUpdateRequest } from 'src/app/Model/UserUpdateRequest';
import { UserRepository } from 'src/app/Repository/UserRepository';
import { AuthService } from '../AuthService/auth.service';

import { LocalstorageService } from '../LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(
    private userRepo: UserRepository,
    private authService: AuthService
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
