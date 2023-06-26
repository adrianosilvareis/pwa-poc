import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsComponent } from './views/contracts/contracts.component';
import { SharedModule } from '@root/app/shared/shared.module';
import { ContractsFormComponent } from './views/contracts-form/contracts-form.component';
import { FormModule } from '@root/app/shared/components/form/form.module';


@NgModule({
  declarations: [
    ContractsComponent,
    ContractsFormComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    SharedModule,
    FormModule
  ]
})
export class ContractsModule { }
