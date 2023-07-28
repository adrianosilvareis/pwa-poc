import { InputFieldProps } from '@components/form/protocols/input-field.props';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, startWith, map, EMPTY, of } from 'rxjs';
import { OptionsType } from "../protocols/options-type";
import { TitleCasePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-autocomplete-form',
  templateUrl: './autocomplete-form.component.html',
  styleUrls: ['./autocomplete-form.component.scss']
})
export class AutocompleteFormComponent extends InputFieldProps implements OnInit{
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

  filteredOptions: Observable<OptionsType[]> = EMPTY;
  selected = '';

  private _options: OptionsType[] = [];

  ngOnInit() {
    this.control = new FormControl('');
    this._updateControlValue();
    this._updateFilteredOptions();
  }

  selectOption() {
    this.selected = this.control.value ?? '';
    const option = this.options.find(option => option.value === this.selected);
    this._setControlValue(option?.label)
    this.group.get(this.inputKey)?.setValue(option);
  }

  clearOption(e: Event, input: HTMLElement) {
    e.preventDefault();
    this.control.setValue('');
    this.selectOption();
    this.filteredOptions = of([]);
    setTimeout(() => {
      input.blur();
      this._updateFilteredOptions()
    });
  }

  private _updateFilteredOptions() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _updateControlValue() {
    const initialValue = this.group.get(this.inputKey)?.value?.at(0);
    const label = this.options.find(option => option.value === initialValue)?.label;
    this._setControlValue(label)
  }

  private _filter(value: string): OptionsType[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.label.toLowerCase().includes(filterValue));
  }

  private _setControlValue(value?: string) {
    this.control.setValue(new TitleCasePipe().transform(value ?? ''));
  }
}
