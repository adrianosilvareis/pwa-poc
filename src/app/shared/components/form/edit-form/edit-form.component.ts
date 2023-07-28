import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormItems } from "../protocols/form-item";

@Component({
  selector: 'app-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class FormComponent {
  @Input() title = '';
  @Input() formId = '';
  @Input() set data(value: FormItems[]) { this.toGroup(value) }

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  fields: FormItems[] = [];
  formGroup!: FormGroup;

  get controls() { return this.formGroup.controls }
  get isInvalid() { return this.formGroup ? this.formGroup.status === 'INVALID' : true }

  constructor(private formBuilder: FormBuilder) { }

  callSave() { this.save.emit(this.formGroup.value) }
  callCancel() { this.cancel.emit() }

  private toGroup(data: FormItems[]) {
    if (data?.length) {
      const group = Object.fromEntries(data.map(item => [item.name, item.value]));
      this.formGroup = this.formBuilder.group(group);
      this.fields = data;
    }
  }
}
