import { FormControl } from "@angular/forms";

export enum FieldType {
  input = 'input',
  autocomplete = 'autocomplete'
}

export interface FormItems {
  colspan: number
  name: string
  placeholder: string
  label: string
  value: unknown[] | FormControl
  type: FieldType
  options?: unknown[]
}
