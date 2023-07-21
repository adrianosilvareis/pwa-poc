import { Component, OnInit } from '@angular/core';
import { InputFieldProps } from '../protocols/input-field.props';
import { FormControl } from '@angular/forms';
import { Clearable } from '../protocols/clearable';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent extends InputFieldProps implements OnInit, Clearable{
  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }

  clear() {
    this.control.setValue(null)
  }
}
