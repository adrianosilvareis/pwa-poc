import { Component, Input, OnInit } from '@angular/core';
import { InputFieldProps } from '../protocols/input-field.props';
import { OptionsType } from '../items.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-multi-select-form',
  templateUrl: './multi-select-form.component.html',
  styleUrls: ['./multi-select-form.component.scss']
})
export class MultiSelectFormComponent extends InputFieldProps implements OnInit{
  @Input() set options (value: OptionsType[] | Observable<OptionsType[]>) {
    if (value instanceof Observable) {
      value.subscribe(options => this._options = options)
    } else {
      this._options = value;
    }
  }

  get options (): OptionsType[] {
    return this._options
  }

  private _options: OptionsType[] = [];
  isAllSelected = false;

  toggleAll() {
    if (this.isAllSelected) {
      this.control.setValue([]);
    } else {
      this.control.setValue(this.options.map(option => option.value));
    }
    this.checkAllSelected();
  }

  checkAllSelected() {
    this.isAllSelected = this.control.value?.length === this.options.length;
  }

  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
    this.checkAllSelected();
  }
}
