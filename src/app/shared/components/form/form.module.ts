import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteFormComponent } from './autocomplete-form/autocomplete-form.component';
import { FormComponent } from './app-form/app-form.component';
import { MaterialModule } from '@root/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
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
import { MultiSelectFormComponent } from './multi-select-form/multi-select-form.component';
import { NumberFormComponent } from './number-form/number-form.component';
import { ActionsFormComponent } from './app-actions-form/app-actions-form.component';


@NgModule({
  declarations: [
    FormComponent,
    AutocompleteFormComponent,
    InputFormComponent,
    DatepickFormComponent,
    CheckboxFormComponent,
    CurrencyFormComponent,
    NumberFormComponent,
    MultiSelectFormComponent,
    ActionsFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FormComponent,
    ActionsFormComponent,
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
