import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyServicesRoutingModule } from './company-services-routing.module';
import { CompanyServiceFormPage } from '@pages/company-services/views/company-service-form/company-service-form.page';
import { CompanyServicesPage } from '@pages/company-services/views/company-services/company-services.page';
import { SharedModule } from '@root/app/shared/shared.module';
import { MaterialModule } from '@root/app/material/material.module';
import { FormModule } from '@root/app/shared/components/form/form.module';


@NgModule({
  declarations: [
    CompanyServicesPage,
    CompanyServiceFormPage
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
