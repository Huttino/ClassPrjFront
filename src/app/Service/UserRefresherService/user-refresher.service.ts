import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { repeat, Subscription } from 'rxjs';
import { LOGGED_USER, TOKEN } from 'src/app/Model/Constants/Constants';
import { User } from 'src/app/Model/User';
import { UserRepository } from 'src/app/Repository/UserRepository';
import { LocalstorageService } from '../LocalStorageService/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserRefresherService {
  private subscription!: Subscription
  constructor(
    private userRepo: UserRepository,
    private storage: LocalstorageService,
    private router: Router
  ) { }

  startObservingMe() {
    this.subscription = this.userRepo.getMe(this.storage.get(TOKEN) as string).pipe(
      repeat({ delay: 20000 })
    ).subscribe({
      next: (y) => {
        this.storage.setObject(LOGGED_USER, y as User);
      },
      error: () => {
        this.router.navigate([
          {
            outlets: {
              primary: ['login'],
              content: []
            }
          }
        ]);
      }
    })
  }
  stopObserving() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe()
    }
  }
}

