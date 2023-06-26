import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit{
  @Input() inputKey = '';
  @Input() group!: FormGroup;
  @Input() label = '';
  @Input() placeholder = 'R$ 0,00';
  @Input() clearable!: boolean;

  control!: FormControl;

  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }

  clear() {
    this.control.setValue(null)
  }
}
