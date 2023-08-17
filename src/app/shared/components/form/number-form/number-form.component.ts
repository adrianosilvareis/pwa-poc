import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputFieldProps } from '@root/app/shared/components/form/protocols/input-field.props';

@Component({
  selector: 'app-number-form',
  templateUrl: './number-form.component.html',
  styleUrls: ['./number-form.component.scss']
})
export class NumberFormComponent extends InputFieldProps implements OnInit{
  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }

  clear() {
    this.control.setValue(null)
  }
}
