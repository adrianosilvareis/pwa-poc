import { AuthService } from './../../services/auth.service';
import { LoginComponent } from './login.component';
import { fireEvent, render, screen } from '@testing-library/angular';
import { MaterialModule } from '@root/app/material/material.module';
import { FormModule } from '@root/app/shared/components/form/form.module';
import { SharedModule } from '@root/app/shared/shared.module';

describe('LoginComponent', () => {
  it('should return an email valid field', async () => {
    const { component } = await setup();
    const email = screen.getByLabelText('Email');
    fireEvent.input(email, { target: { value: 'name@email.com' } });
    expect(component.email.valid).toBeTruthy();
  });
  it('should return an email invalid field', async () => {
    const { component } = await setup();
    const email = screen.getByLabelText('Email');
    fireEvent.input(email, { target: { value: 'invalidemail.com' } });
    expect(component.email.invalid).toBeTruthy();
  });
  it('should return a password valid field', async () => {
    const { component } = await setup();
    const password = screen.getByLabelText('Password');
    fireEvent.input(password, { target: { value: '123456789' } });
    expect(component.password.valid).toBeTruthy();
  });
  it('should return a password invalid field', async () => {
    const { component } = await setup();
    const password = screen.getByLabelText('Password');
    fireEvent.input(password, { target: { value: '123' } });
    expect(component.password.invalid).toBeTruthy();
  });
  it('should return a form valid', async () => {
    const { component } = await setup();
    const email = screen.getByLabelText('Email');
    const password = screen.getByLabelText('Password');
    fireEvent.input(email, { target: { value: 'name@email.com' } });
    fireEvent.input(password, { target: { value: '123456789' } });
    expect(component.form.valid).toBeTruthy();
  });
  it('should call AuthService when click in login and form is valid', async () => {
    const { loginSpy } = await setup();
    const email = screen.getByLabelText('Email') as HTMLInputElement;
    const password = screen.getByLabelText('Password') as HTMLInputElement;
    fireEvent.input(email, { target: { value: 'name@email.com' } });
    fireEvent.input(password, { target: { value: '123456789' } });

    screen.getByTestId('signin').click();
    expect(loginSpy).toHaveBeenCalledWith(email.value, password.value);
  });
  it('should not call AuthService when click in login and form is invalid', async () => {
    const { loginSpy } = await setup();

    screen.getByTestId('signin').click();
    expect(loginSpy).toBeCalledTimes(0);
  });
});

async function setup() {
  const loginSpy = jest.fn();
  const comp = await render(LoginComponent, {
    imports: [
      MaterialModule,
      FormModule,
      SharedModule,
    ],
    providers: [
      { provide: AuthService, useValue: { login: loginSpy } }
    ]
  })
  const component = comp.fixture.componentInstance;

  return {
    component,
    loginSpy
  }
}
