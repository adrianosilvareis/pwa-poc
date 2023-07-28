import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorHelperService {

  form!: FormGroup;

  initialize(form: FormGroup): void {
    this.form = form;
  }

  hasError(controlName: string):  boolean {
    return !!this.form.get(controlName)?.errors;
  }

  getErrors(controlName: string): ValidationErrors {
    return this.form.get(controlName)?.errors as ValidationErrors;
  }
}
