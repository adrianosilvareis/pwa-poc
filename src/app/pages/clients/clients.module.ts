import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './views/list/clients.component';
import { SharedModule } from '@root/app/components/shared.module';


@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
