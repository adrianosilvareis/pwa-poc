import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../pages/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.has('No-Auth-Interceptor')) {
      return next.handle(request);
    }

    if (this.auth.isAuthenticated()) {
      const accessToken = this.auth.getAccessToken();
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } else {
      this.auth.refreshAccessToken();
    }

    return next.handle(request);
  }
}
