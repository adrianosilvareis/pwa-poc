import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent {
  @Input() inputKey: string = '';
  @Input() group!: FormGroup;
  @Input() label: string = '';
  @Input() placeholder: string = 'R$ 0,00';
  @Input() clearable!: boolean;

  control!: FormControl;

  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }

  clear() {
    this.control.setValue(null)
  }
}
