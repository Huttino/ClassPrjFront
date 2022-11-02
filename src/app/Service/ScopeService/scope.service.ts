import { Injectable } from '@angular/core';
import { PublicRepository } from 'src/app/Repository/PublicRepository';

@Injectable({
  providedIn: 'root'
})
export class ScopeService {

  constructor(
    private publicRepo: PublicRepository
  ) {
  }

  public getAllScopes() {
    return this.publicRepo.getScopes()
  }
}
