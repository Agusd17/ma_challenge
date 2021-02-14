import { TestBed } from '@angular/core/testing';

import { FormValidatorAuthGuard } from './formvalidator-auth.guard';

describe('FormValidatorAuthGuard', () => {
  let guard: FormValidatorAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FormValidatorAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
