import { FormControl } from "@angular/forms";
import { FieldType } from "./field-type";
import { OptionsType } from "./options-type";


export interface FormItems {
  colspan: number;
  name: string;
  placeholder: string;
  label: string;
  value: FormControl;
  type: FieldType;
  options?: OptionsType[];
  clearable?: boolean;
  disabled?: boolean;
}
