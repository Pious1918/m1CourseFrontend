import { TestBed } from '@angular/core/testing';

import { LandingguardService } from './landingguard.service';

describe('LandingguardService', () => {
  let service: LandingguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
