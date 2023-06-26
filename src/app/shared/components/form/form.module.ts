import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteFormComponent } from './autocomplete-form/autocomplete-form.component';
import { FormComponent } from './edit-form/edit-form.component';
import { MaterialModule } from '@root/app/material/material.module';
import { PipeModule } from '@root/app/pipe/pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { InputFormComponent } from './input-form/input-form.component';
import { DatepickFormComponent } from './datepick-form/datepick-form.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { CheckboxFormComponent } from './checkbox-form/checkbox-form.component';
import { CurrencyFormComponent } from './currency-form/currency-form.component';


@NgModule({
  declarations: [
    FormComponent,
    AutocompleteFormComponent,
    InputFormComponent,
    DatepickFormComponent,
    CheckboxFormComponent,
    CurrencyFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FormComponent,
    AutocompleteFormComponent,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class FormModule { }
