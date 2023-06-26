import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-form',
  templateUrl: './checkbox-form.component.html',
  styleUrls: ['./checkbox-form.component.scss']
})
export class CheckboxFormComponent implements OnInit{
  @Input() inputKey = '';
  @Input() group!: FormGroup;
  @Input() label = '';

  control = new FormControl('');

  ngOnInit() {
    this.control = this.group.get(this.inputKey) as FormControl
  }
}
