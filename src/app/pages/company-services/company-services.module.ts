import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyServicesRoutingModule } from './company-services-routing.module';
import { CompanyServiceFormComponent } from '@pages/company-services/views/company-service-form/company-service-form.component';
import { CompanyServicesComponent } from '@pages/company-services/views/company-services/company-services.component';
import { SharedModule } from '@root/app/components/shared.module';
import { MaterialModule } from '@root/app/material/material.module';
import { FormModule } from '@root/app/components/form/form.module';


@NgModule({
  declarations: [
    CompanyServicesComponent,
    CompanyServiceFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormModule,
    MaterialModule,
    CompanyServicesRoutingModule
  ]
})
export class CompanyServicesModule { }
