import { InputFieldProps } from '@root/app/shared/components/form/protocols/input-field.props';
import { Component, OnInit } from '@angular/core';
import { Clearable } from '../protocols/clearable';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepick-form',
  templateUrl: './datepick-form.component.html',
  styleUrls: ['./datepick-form.component.scss']
})
export class DatepickFormComponent extends InputFieldProps implements OnInit, Clearable{
  constructor() {
    super()
    this.placeholder = 'Choose a Data'
  }

  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }

  clear() {
    this.control.setValue(null)
  }
}
