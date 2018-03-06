import { TestBed, inject } from '@angular/core/testing';

import { NonAuthService } from './non-auth.service';

describe('NonAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NonAuthService]
    });
  });

  it('should be created', inject([NonAuthService], (service: NonAuthService) => {
    expect(service).toBeTruthy();
  }));
});
