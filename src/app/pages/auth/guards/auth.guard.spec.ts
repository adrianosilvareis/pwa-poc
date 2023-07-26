import { TestBed } from '@angular/core/testing';
import { AuthService } from '@pages/auth/services/auth.service';

import { AuthGuard } from './auth.guard';
import { Observable, of } from 'rxjs';
import { Tokens } from '@pages/auth/protocols/tokens';
import { Authentication } from '@pages/auth/protocols/authentication';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    });
    guard = TestBed.inject(AuthGuard);
    service = TestBed.inject(AuthService);
  });

  it('should not access router and call navigate with "auth"', () => {
    service.refreshAccessToken = jest.fn();
    expect(guard.canActivate()).toBeFalsy();
    expect(service.refreshAccessToken).toHaveBeenCalled();
  });

  it('should not access router and call navigate with "auth"', () => {
    service.login('email', 'password');

    expect(guard.canActivate()).toBeTruthy();
  });
});

class AuthServiceStub implements Authentication {
  error = '';

  refresh_token = '';
  access_token = '';

  login(email: string, password: string): Observable<Tokens> {
    this.refresh_token = `_email:${email};_password:${password};`
    this.access_token = `_email:${email};_password:${password};`
    return of({
      refresh_token: this.refresh_token,
      access_token: this.access_token
    })
  }

  logout(): void {
    this.refresh_token = '';
    this.access_token = '';
  }
  getAccessToken(): string {
    return this.access_token;
  }
  refreshAccessToken(): void {
    this.access_token = this.refresh_token;
  }
  isAuthenticated(): boolean {
    return !!this.access_token;
  }
}
