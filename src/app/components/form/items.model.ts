import { FormControl } from "@angular/forms";

export interface FormItems {
  colspan: number,
  name: string,
  placeholder: string,
  label: string,
  value: unknown[] | FormControl
}
