import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsPage } from './views/contracts/contracts.page';
import { SharedModule } from '@root/app/shared/shared.module';
import { ContractsFormPage } from './views/contracts-form/contracts-form.page';
import { FormModule } from '@root/app/shared/components/form/form.module';
import { MaterialModule } from '@root/app/material/material.module';


@NgModule({
  declarations: [
    ContractsPage,
    ContractsFormPage
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    SharedModule,
    FormModule,
    MaterialModule
  ]
})
export class ContractsModule { }
