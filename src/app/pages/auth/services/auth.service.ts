import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, take, tap } from 'rxjs';
import { Tokens } from '@pages/auth/protocols/tokens';
import { environment } from '@root/environments/environment';
import { Router } from '@angular/router';
import { Authentication } from '@pages/auth/protocols/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements Authentication{
  error = '';

  private apiUrl = environment.baseUrl;
  private accessTokenCookieName = environment.JWT.access_token_key;
  private refreshTokenCookieName = environment.JWT.refresh_token_key;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  login(email: string, password: string): Observable<Tokens> {
    const headers = new HttpHeaders().set('No-Auth-Interceptor', 'true');
    return this.http.post<Tokens>(`${this.apiUrl}/login`, { email, password }, { headers })
      .pipe(
        tap((tokens: Tokens) => {
          this.cookieService.set(this.accessTokenCookieName, tokens.access_token);
          this.cookieService.set(this.refreshTokenCookieName, tokens.refresh_token, undefined, '/', undefined, true, 'Strict');
        })
      )
  }

  logout(): void {
    this.cookieService.delete(this.accessTokenCookieName);
    this.cookieService.delete(this.refreshTokenCookieName);
    this.router.navigate(['auth']);
  }

  getAccessToken() {
    return this.cookieService.get(this.accessTokenCookieName);
  }

  refreshAccessToken(): void {
    const headers = new HttpHeaders().set('No-Auth-Interceptor', 'true');
    const refreshToken = this.cookieService.get(this.refreshTokenCookieName);
    this.http.post<Tokens>(`${this.apiUrl}/refresh`, { refresh_token: refreshToken }, { headers })
      .pipe(
        take(1),
        tap((tokens: Tokens) => {
          this.cookieService.set(this.accessTokenCookieName, tokens.access_token);
        }),
        catchError((err) => {
          this.logout();
          return err;
        })
      ).subscribe(() => {
        console.info('Token atualizado');
      });
  }

  isAuthenticated() {
    return !!this.cookieService.get(this.accessTokenCookieName);
  }
}
