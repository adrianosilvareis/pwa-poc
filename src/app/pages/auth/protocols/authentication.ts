import { Observable } from "rxjs";
import { Tokens } from "./tokens";

export interface Authentication {
  error:string;
  login(email: string, password: string): Observable<Tokens>;
  logout(): void;
  getAccessToken(): string;
  refreshAccessToken(): void;
  isAuthenticated(): boolean;
}
