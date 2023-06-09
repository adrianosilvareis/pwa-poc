import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { FieldType, FormItems, OptionsType } from '@root/app/shared/components/form/items.model';
import { Injectable } from '@angular/core';

export interface AddItem {
  name: string;
  colspan?: number;
  placeholder?: string;
  label?: string;
  value?: unknown;
  clearable?: boolean;
  type?: FieldType;
}

@Injectable({
  providedIn: 'root'
})
export class FormItemsBuilderService {

  private data: FormItems[] = []

  private currentName!: string;

  addItem(formItem: AddItem): FormItemsBuilderService {
    const item = {
      colspan: formItem.colspan ?? 1,
      name: formItem.name,
      placeholder: formItem.placeholder ?? this.toTitleCase(formItem.name),
      label: formItem.label ?? this.toTitleCase(formItem.name),
      value: [formItem.value],
      type: formItem.type ?? FieldType.input,
      clearable: formItem.clearable
    }
    this.data.push(item);
    this.currentName = formItem.name;

    return this
  }

  get(name: string) {
    this.currentName = name
    return this
  }

  addValidations(validations: ((control: AbstractControl<any, any>) => ValidationErrors | null)[]): FormItemsBuilderService {
    return this.changeCurrent((item) => {
        let value;
        if (item.value instanceof Array ) {
          value = item.value[0]
        }

        return {
          ...item,
          value: new FormControl(value, validations)
        }
      });
  }

  addOptions(options: OptionsType[]) {
    return this.changeCurrent((item) => {
      if (item.type !== FieldType.autocomplete) {
        throw new Error(`field with type "${item.type}" is not able to use this addOptions`)
      }
      item.options = options;
      return item
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

