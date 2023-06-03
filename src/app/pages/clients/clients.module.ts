import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './views/list/clients.component';
import { SharedModule } from '@root/app/components/shared.module';
import { ClientFormComponent } from './views/client-form/client-form.component';
import { MaterialModule } from '@root/app/material/material.module';
import { FormModule } from '@root/app/components/form/form.module';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    FormModule,
    SharedModule,
    MaterialModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
