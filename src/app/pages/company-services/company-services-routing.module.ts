import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyServicesComponent } from '@pages/company-services/views/company-services/company-services.component';
import { CompanyServiceFormPage } from '@pages/company-services/views/company-service-form/company-service-form.component';

const routes: Routes = [
  { path: '', title:"Services", component: CompanyServicesComponent },
  { path: 'new', title:"Services", component: CompanyServiceFormPage },
  { path: ':id', title:"Services", component: CompanyServiceFormPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyServicesRoutingModule { }
