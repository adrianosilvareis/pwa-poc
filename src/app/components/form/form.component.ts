import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormItems } from './items.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() title: string = '';
  @Input() formId: string = '';
  @Input() set data(value: FormItems[]) { this.toGroup(value) }

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  fields: FormItems[] = [];
  formGroup!: FormGroup;

  get controls() { return this.formGroup.controls }
  get isInvalid() { return this.formGroup.status === 'INVALID' }

  constructor(private formBuilder: FormBuilder) { }

  callSave() { this.save.emit(this.formGroup.value) }
  callCancel() { this.cancel.emit() }

  private toGroup(data: FormItems[]) {
    const group = Object.fromEntries(data.map(item => [item.name, item.value]));
    this.formGroup = this.formBuilder.group(group);
    this.fields = data;
  }
}
