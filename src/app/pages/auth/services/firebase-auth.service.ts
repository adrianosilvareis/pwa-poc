import { Injectable } from '@angular/core';
import { AuthService } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService implements AuthService {

  signInWithEmailAndPassword(email: string, password: string): Promise<string> {
    return new Promise((resolve) => { resolve(`${email}-${password}`) })
  }
  signInWithPopup(provider: unknown): Promise<string> {
    return new Promise((resolve) => { resolve(`${provider}`) })
  }
}
