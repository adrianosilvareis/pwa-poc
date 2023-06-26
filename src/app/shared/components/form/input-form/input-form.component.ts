import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit{
  @Input() inputKey: string = '';
  @Input() group!: FormGroup;
  @Input() label: string = '';
  @Input() placeholder: string = 'Select one';
  @Input() clearable!: boolean;

  control!: FormControl;

  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }

  clear() {
    this.control.setValue(null)
  }
}
