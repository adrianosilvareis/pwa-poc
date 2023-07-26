import { Injectable } from '@angular/core';
import { AuthService } from '@pages/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  constructor(
    private auth: AuthService) {}

  canActivate() {
    if (!this.auth.isAuthenticated()) {
      this.auth.refreshAccessToken();
    }
    return this.auth.isAuthenticated();
  }
}
