import { FormControl } from "@angular/forms";

export enum FieldType {
  input = 'input',
  autocomplete = 'autocomplete',
  date = 'date',
  YesNo = 'YesNo',
  currency = 'currency',
}

export interface OptionsType {
  value: unknown;
  label: string;
}

export interface FormItems {
  colspan: number
  name: string
  placeholder: string
  label: string
  value: unknown[] | FormControl
  type: FieldType
  options?: OptionsType[]
  clearable?: boolean
}
