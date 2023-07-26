import { Component, OnInit } from '@angular/core';
import { AuthService } from '@pages/auth/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHelperService } from '@root/app/services/error-helper.service';
import { Router } from '@angular/router';
import { catchError, take } from 'rxjs';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  email!: FormControl;
  password!: FormControl;
  form!: FormGroup;

  constructor(
    public readonly error: ErrorHelperService,
    public readonly auth: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router) {}

  ngOnInit(): void {
    this.auth.logout();
    this.form = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(25), Validators.required]),
    })

    this.email = this.form.get('email') as FormControl;
    this.password = this.form.get('password') as FormControl;
    this.error.initialize(this.form);
  }

  login(): void {
    if (this.form.valid) {
      this.auth
        .login(this.form.value.email, this.form.value.password)
        .pipe(
          take(1),
          catchError((err) => {
            console.error('Error ao logar', err);
            return err;
          }))
        .subscribe(() => {
            this.router.navigate(['home']);
          }
        );
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }
}
