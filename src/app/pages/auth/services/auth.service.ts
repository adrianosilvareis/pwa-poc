import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;
  error = '';

  login(email: string, password: string): void {
    // Aqui você pode implementar a lógica de autenticação, como fazer uma chamada a uma API para verificar as credenciais.
    // Neste exemplo, vamos apenas verificar se o usuário e a senha não estão vazios.
    if (email && password === '12345678') {
      this.isAuthenticated = true;
      this.error = ''
      console.log('Usuário autenticado com sucesso!');
    } else {
      this.isAuthenticated = false;
      console.log('Falha na autenticação!');
      this.error = 'Falha na autenticação!'
    }
  }
}
