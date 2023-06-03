import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, startWith, map, EMPTY, of } from 'rxjs';

@Component({
  selector: 'app-autocomplete-form',
  templateUrl: './autocomplete-form.component.html',
  styleUrls: ['./autocomplete-form.component.scss']
})
export class AutocompleteFormComponent{
  @Input() inputKey: string = '';
  @Input() group!: FormGroup;
  @Input() label: string = '';
  @Input() placeholder: string = 'Select one';
  @Input() clearable!: boolean;
  @Input('options') set options (value: string[] | Observable<string[]>) {
    if (value instanceof Array<String>) {
      this._options = value
    } else {
      value.subscribe(options => this._options = options)
    }
  }
  get options (): string[] {
    return this._options
  }

  filteredOptions: Observable<string[]> = EMPTY;
  control = new FormControl('');
  selected = '';

  private _options: string[] = [];

  ngOnInit() {
    this._updateFilteredOptions();
  }

  selectOption() {
    this.selected = this.control.value ?? '';
    this.group.get(this.inputKey)?.setValue(this.control.value);
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
