import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClassRoom } from 'src/app/Model/ClassRoom';
import { TOKEN } from 'src/app/Model/Constants/Constants';
import { User } from 'src/app/Model/User';
import { UserRepository } from 'src/app/Repository/UserRepository';

import { LocalstorageService } from '../LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(
    private userRepo:UserRepository,
    private local:LocalstorageService
  ) { }

  getMe(){
    return this.userRepo.getMe(this.local.get(TOKEN)+"")
  }

  getMyClasses(){
    return this.userRepo.getMyClasses(this.local.get(TOKEN)+"")
  }
  joinClass(id:number){
    return this.userRepo.join(id,this.local.get(TOKEN)+"")
  }
  leaveClass(id:number){
    return this.userRepo.leave(id,this.local.get(TOKEN)+"")
  }
}
