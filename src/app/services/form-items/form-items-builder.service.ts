import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { FormItems } from '@components/form/items.model';
import { Injectable } from '@angular/core';

export interface AddItem {
  name: string;
  colspan?: number;
  placeholder?: string;
  label?: string;
  value?: unknown;
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
      value: [formItem.value]
    }
    this.data.push(item);
    this.currentName = formItem.name;

    return this
  }

  addValidations(validations: ((control: AbstractControl<any, any>) => ValidationErrors | null)[]): FormItemsBuilderService {
    this.data = this.data.map(item => {
      let value;
      if (item.name === this.currentName) {
        if (item.value instanceof Array ) {
          value = item.value[0]
        }

        return {
          ...item,
          value: new FormControl(value, validations)
        }
      }
      return item;
    })
    return this
  }

  build() {
    const data = [...this.data];
    this.data = [];
    return data
  }

  private toTitleCase(text: string){
    return text.at(0)?.toUpperCase() + text.slice(1).toLowerCase();
  }
}

