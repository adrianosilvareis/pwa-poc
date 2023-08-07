import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { FieldType } from '@root/app/shared/components/form/protocols/field-type';
import { OptionsType } from "@root/app/shared/components/form/protocols/options-type";
import { FormItems } from "@root/app/shared/components/form/protocols/form-item";
import { Injectable } from '@angular/core';

export interface AddItem {
  name: string;
  colspan?: number;
  placeholder?: string;
  label?: string;
  value?: unknown;
  clearable?: boolean;
  disabled?: boolean;
  type?: FieldType;
  suffix?: string;
  prefix?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FormItemsBuilder {

  private data: FormItems[] = []

  private currentName!: string;

  addItem(formItem: AddItem): FormItemsBuilder {
    const item = {
      colspan: formItem.colspan ?? 1,
      name: formItem.name,
      placeholder: formItem.placeholder ?? this.toTitleCase(formItem.name),
      label: formItem.label ?? this.toTitleCase(formItem.name),
      value: new FormControl(formItem.value),
      type: formItem.type ?? FieldType.input,
      clearable: formItem.clearable,
      suffix: formItem.suffix,
      prefix: formItem.prefix,
    }
    this.data.push(item);
    this.currentName = formItem.name;
    return this
  }

  get(name: string) {
    this.currentName = name
    return this
  }

  disabled() {
    return this.changeCurrent((item) => {
      item.value.disable();
      return item
    });
  }

  addValidations(validations: ((control: AbstractControl<unknown, unknown>) => ValidationErrors | null)[]): FormItemsBuilder {
    return this.changeCurrent((item) => {
      item.value.setValidators(validations);
      item.value.updateValueAndValidity();
      return item
    });
  }

  addOptions(options: OptionsType[]) {
    return this.changeCurrent((item) => {
      if (item.type === FieldType.autocomplete || item.type === FieldType.multiselect) {
        item.options = options;
        return item
      }
      throw new Error(`field with type "${item.type}" is not able to use this addOptions`)
    })
  }

  build() {
    const data = [...this.data];
    this.data = [];
    return data
  }

  private toTitleCase(text: string){
    return text.at(0)?.toUpperCase() + text.slice(1).toLowerCase();
  }

  private changeCurrent(callback: (item: FormItems) => FormItems) {
    this.data = this.data.map(item => item.name === this.currentName ? callback(item) : item );
    return this
  }
}

