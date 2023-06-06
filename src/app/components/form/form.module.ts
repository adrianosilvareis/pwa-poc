import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteFormComponent } from './autocomplete-form/autocomplete-form.component';
import { FormComponent } from './edit-form/edit-form.component';
import { MaterialModule } from '@root/app/material/material.module';
import { PipeModule } from '@root/app/pipe/pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { InputFormComponent } from './input-form/input-form.component';


@NgModule({
  declarations: [
    FormComponent,
    AutocompleteFormComponent,
    InputFormComponent
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
  ]
})
export class FormModule { }