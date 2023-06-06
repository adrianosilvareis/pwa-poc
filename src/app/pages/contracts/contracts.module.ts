import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contracts-routing.module';
import { ContractsComponent } from './views/contracts/contracts.component';
import { SharedModule } from '@root/app/components/shared.module';


@NgModule({
  declarations: [
    ContractsComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    SharedModule
  ]
})
export class ContractsModule { }
