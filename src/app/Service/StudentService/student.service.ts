import { Injectable } from '@angular/core';
import { UserRepository } from 'src/app/Repository/UserRepository';
import { AuthService } from '../AuthService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    public userRepo: UserRepository,
    public authService: AuthService
  ) { }
  joinClass(id: number) {
    return this.userRepo.join(id, this.authService.getJWTToken())
  }
  leaveClass(id: number) {
    return this.userRepo.leave(id, this.authService.getJWTToken())
  }
}
