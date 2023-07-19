import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: AuthService;
  const navigateSpy = jest.fn();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: Router, useValue: { navigate: navigateSpy } }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
  });

  it('should not access router and call navigate with "auth"', () => {
    expect(guard.canActivate()).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['auth']);
  });

  it('should not access router and call navigate with "auth"', () => {
    service.isAuthenticated = true;

    expect(guard.canActivate()).toBeTruthy();
    expect(navigateSpy).toHaveBeenCalled();
  });
});

class AuthServiceStub implements AuthService {
  isAuthenticated = false;
  error = '';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(_email: string, _password: string): void {
    this.isAuthenticated = true;
  }
}
