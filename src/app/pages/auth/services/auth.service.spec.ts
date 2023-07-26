import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { environment } from '@root/environments/environment';

describe('AuthService', () => {
  const headers = new HttpHeaders().set('No-Auth-Interceptor', 'true')
  const mockedToken = of({ refresh_token: 'refresh_token', access_token: 'access_token' });

  let service: AuthService;
  let cookie: CookieService;
  let http: HttpClient;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: { post: jest.fn() }},
        { provide: CookieService, useValue: { set: jest.fn(), get: jest.fn(), delete: jest.fn() }},
        { provide: Router, useValue: { navigate: jest.fn() }}
      ]
    });
    service = TestBed.inject(AuthService);
    cookie = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpClient);
    http.post = jest.fn().mockReturnValue(mockedToken);
  });

  it('should call API correctly when do login', () => {
    service.login('email', 'password');
    expect(http.post).toBeCalledWith(`${environment.baseUrl}/login`, { email: 'email', password: 'password' }, { headers });
  });

  it('should call API correctly when do login', (done) => {
    service.login('email', 'password').subscribe(() => {
      expect(cookie.set).toHaveBeenCalledWith('access_token', 'access_token');
      expect(cookie.set).toHaveBeenCalledWith('refresh_token', 'refresh_token', undefined, "/", undefined, true, "Strict");
      done();
    });
  });

  it('should clean cookie when logout', () => {
    service.logout();
    expect(cookie.delete).toHaveBeenCalledWith('access_token');
    expect(cookie.delete).toHaveBeenCalledWith('refresh_token');
  });

  it('should go to auth when make logout', () => {
    service.logout();
    expect(router.navigate).toHaveBeenCalledWith(['auth']);
  });

  it('should get access token from cookie', () => {
    cookie.get = jest.fn().mockReturnValue('access_token');
    expect(service.getAccessToken()).toBe('access_token');
  });

  it('should call API correctly when refresh access token', () => {
    cookie.get = jest.fn().mockReturnValue('refresh_token');
    service.refreshAccessToken();
    expect(http.post).toBeCalledWith(`${environment.baseUrl}/refresh`, { refresh_token: 'refresh_token' }, { headers });
  });

  it('should update cookie when API return with success', () => {
    service.refreshAccessToken();
    expect(cookie.set).toBeCalledWith('access_token', 'access_token');
  });

  it('should call logout when API failed', () => {
    service.logout = jest.fn();
    http.post = jest.fn().mockReturnValue(throwError(() => new Error('error')));
    service.refreshAccessToken();
    expect(service.logout).toBeCalled();
  });

  it('should return true if access token is valid', () => {
    cookie.get = jest.fn().mockReturnValue('access_token');
    expect(service.isAuthenticated()).toBeTruthy();
  })

  it('should return true if access token is invalid', () => {
    cookie.get = jest.fn().mockReturnValue('');
    expect(service.isAuthenticated()).toBeFalsy();
  })
});
