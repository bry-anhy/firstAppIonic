import { TestBed } from '@angular/core/testing';

import { CheckTutorialGuardService } from './check-tutorial.guard.service';

describe('CheckTutorialGuardService', () => {
  let service: CheckTutorialGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckTutorialGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
