import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datepick-form',
  templateUrl: './datepick-form.component.html',
  styleUrls: ['./datepick-form.component.scss']
})
export class DatepickFormComponent implements OnInit {
  @Input() inputKey = '';
  @Input() group!: FormGroup;
  @Input() label = '';
  @Input() placeholder = 'Choose a Data';
  @Input() clearable!: boolean;

  control = new FormControl('');

  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }

  clear() {
    this.control.setValue(null)
  }
}
