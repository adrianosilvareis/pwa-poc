import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@pages/auth/model/auth.model';
import { FirebaseAuthService } from '@pages/auth/services/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  hide = true;

  formGroup!: FormGroup;

  getControls (controlName: string): AbstractControl {
    return this.formGroup.controls[controlName];
  }

  constructor(
    private fb: FormBuilder,
    @Inject(FirebaseAuthService) private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)])
    })
  }

  login() {
    const { email, password } = this.formGroup.value;
    // Aqui você pode implementar a lógica de autenticação com e-mail e senha
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        // Sucesso no login
        console.log('Login com e-mail e senha realizado com sucesso!');
      })
      .catch(error => {
        // Tratamento de erro no login
        console.error('Erro ao realizar login:', error);
      });
  }

  signup() {
    console.log('cadastro')
  }
  loginWithGoogle() {
    // Aqui você pode implementar a lógica de autenticação com o Google
    this.auth.signInWithPopup('googleProviderInstance')
      .then(() => {
        // Sucesso no login
        console.log('Login com Google realizado com sucesso!');
      })
      .catch(error => {
        // Tratamento de erro no login
        console.error('Erro ao realizar login com Google:', error);
      });
  }

  loginWithGithub() {
    // Aqui você pode implementar a lógica de autenticação com o GitHub
    this.auth.signInWithPopup('githubProviderInstance')
      .then(() => {
        // Sucesso no login
        console.log('Login com GitHub realizado com sucesso!');
      })
      .catch(error => {
        // Tratamento de erro no login
        console.error('Erro ao realizar login com GitHub:', error);
      });
  }

  forgotPassword() {
    // Aqui você pode implementar a lógica para redefinir a senha
    console.log('Esqueci a senha');
  }
}
