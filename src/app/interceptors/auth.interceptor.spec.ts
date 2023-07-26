import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../pages/auth/services/auth.service';
import { HttpHeaders, HttpRequest } from '@angular/common/http';

describe('AuthInterceptor', () => {
  let service: AuthService;
  let interceptor: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: { isAuthenticated: jest.fn(), refreshAccessToken: jest.fn(), getAccessToken: jest.fn() }}
      ]
    });
    interceptor = TestBed.inject(AuthInterceptor);
    service = TestBed.inject(AuthService);
  });

  it('should scape if header has No-Auth-Interceptor value', () => {
    const headers = new HttpHeaders().set('No-Auth-Interceptor', 'true');
    const request = new HttpRequest('GET', 'http://localhost:3000', { headers});
    const nextMock = { handle: jest.fn() };

    interceptor.intercept(request, nextMock);
    expect(nextMock.handle).toHaveBeenCalledWith(request);
  });

  it('should added authorization if user is authenticated', () => {
    const request = new HttpRequest('GET', 'http://localhost:3000');

    const nextMock = { handle: jest.fn() };
    service.isAuthenticated = jest.fn().mockReturnValue(true);
    service.getAccessToken = jest.fn().mockReturnValue('token');

    const interceptedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer token`
      }
    })
    interceptor.intercept(request, nextMock);
    expect(nextMock.handle).toHaveBeenCalledWith(interceptedRequest);
  });

  it('should call refresh token is token expired', () => {
    const request = new HttpRequest('GET', 'http://localhost:3000');
    const nextMock = { handle: jest.fn() };
    service.isAuthenticated = jest.fn().mockReturnValue(false);
    service.refreshAccessToken = jest.fn();

    interceptor.intercept(request, nextMock);
    expect(service.refreshAccessToken).toHaveBeenCalled();
    expect(nextMock.handle).toHaveBeenCalledWith(request);
  });
});
