import { TestBed } from '@angular/core/testing';

import { UserRefresherService } from './user-refresher.service';

describe('UserRefresherService', () => {
  let service: UserRefresherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRefresherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
