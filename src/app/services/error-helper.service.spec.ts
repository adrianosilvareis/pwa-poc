import { TestBed } from '@angular/core/testing';

import { ErrorHelperService } from './error-helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('ErrorHelperService', () => {
  let service: ErrorHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHelperService);
  });

  it('should return email validation error', () => {
    const group = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    })
    group.patchValue({ email: 'test' });

    service.initialize(group);
    const errors = service.getErrors('email');
    expect(errors).toEqual({ email: true });
  });

  it('should return required validation error', () => {
    const group = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    service.initialize(group);
    const errors = service.getErrors('email');
    expect(errors).toEqual({ required: true });
  });

  it('should not hasError', () => {
    const group = new FormGroup({
      email: new FormControl('name@email.com', [Validators.required, Validators.email])
    });

    service.initialize(group);
    expect(service.hasError('email')).toBeFalsy();
  });

  it('should hasError', () => {
    const group = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    service.initialize(group);
    expect(service.hasError('email')).toBeTruthy();
  });
});
