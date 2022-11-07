import { TestBed } from '@angular/core/testing';

import { SubscribedGuard } from './subscribed.guard';

describe('SubscribedGuard', () => {
  let guard: SubscribedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SubscribedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
