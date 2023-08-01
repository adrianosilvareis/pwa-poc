import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormItems } from "../protocols/form-item";
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class FormComponent implements OnDestroy {
  @Input() title = '';
  @Input() formId = '';
  @Input() set data(value: FormItems[]) { this.toGroup(value) }

  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() valueChange = new EventEmitter();

  fields: FormItems[] = [];
  formGroup!: FormGroup;

  get controls() { return this.formGroup.controls }
  get isInvalid() { return this.formGroup ? this.formGroup.status === 'INVALID' : true }

  private destroyed$ = new Subject();

  constructor(private formBuilder: FormBuilder) { }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  callSave() { this.save.emit(this.formGroup.value) }
  callCancel() { this.cancel.emit() }

  private toGroup(data: FormItems[]) {
    if (data?.length) {
      const group = Object.fromEntries(data.map(item => [item.name, item.value]));
      this.formGroup = this.formBuilder.group(group);
      this.registerValueChanges();
      this.fields = data;
    }
  }

  private registerValueChanges() {
    this.formGroup.valueChanges
      .pipe(takeUntil(this.destroyed$), distinctUntilChanged((prev, curr) => !Object.keys(prev).some(key => prev[key] !== curr[key])))
      .subscribe((value) => this.valueChange.emit({ value, form: this.formGroup }))
  }
}
