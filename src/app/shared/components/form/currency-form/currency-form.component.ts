import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputFieldProps } from '@root/app/shared/components/form/protocols/input-field.props';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent extends InputFieldProps implements OnInit{
  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }

  clear() {
    this.control.setValue(null)
  }
}
