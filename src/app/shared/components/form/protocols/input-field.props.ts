import { Input, Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  template: ''
})
export abstract class InputFieldProps {
  @Input() inputKey = '';
  @Input() group!: FormGroup;
  @Input() label = '';
  @Input() placeholder = '0,00';
  @Input() clearable!: boolean;
  @Input() disabled = false;
  @Input() suffix!: string;
  @Input() prefix!: string;

  control!: FormControl;
}
