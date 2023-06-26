import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.scss']
})
export class CheckboxFormComponent {
  @Input() inputKey: string = '';
  @Input() group!: FormGroup;
  @Input() label: string = '';

  control = new FormControl('');

  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }
}
