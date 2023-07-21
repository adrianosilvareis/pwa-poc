import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsPage } from './views/list/clients.page';
import { SharedModule } from '@root/app/shared/shared.module';
import { ClientFormPage } from './views/client-form/client-form.page';
import { MaterialModule } from '@root/app/material/material.module';
import { FormModule } from '@root/app/shared/components/form/form.module';

@NgModule({
  declarations: [
    ClientsPage,
    ClientFormPage
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
