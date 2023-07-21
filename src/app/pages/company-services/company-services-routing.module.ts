import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyServicesPage } from '@pages/company-services/views/company-services/company-services.page';
import { CompanyServiceFormPage } from '@pages/company-services/views/company-service-form/company-service-form.page';

const routes: Routes = [
  { path: '', title:"Services", component: CompanyServicesPage },
  { path: 'new', title:"Services", component: CompanyServiceFormPage },
  { path: ':id', title:"Services", component: CompanyServiceFormPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyServicesRoutingModule { }
