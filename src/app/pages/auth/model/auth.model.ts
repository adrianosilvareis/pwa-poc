export interface AuthService {
  signInWithEmailAndPassword(email: string, password: string): Promise<string>;
  signInWithPopup(provider: unknown): Promise<string>;
}
