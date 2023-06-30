import { OnInit, Input, Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  template: ''
})
export class InputFieldPropsComponent implements OnInit{
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
