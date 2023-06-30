import { InputFieldPropsComponent } from '@components/form/input-field-props.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-datepick-form',
  templateUrl: './datepick-form.component.html',
  styleUrls: ['./datepick-form.component.scss']
})
export class DatepickFormComponent extends InputFieldPropsComponent {
  constructor() {
    super()
    this.placeholder = 'Choose a Data'
  }
}
