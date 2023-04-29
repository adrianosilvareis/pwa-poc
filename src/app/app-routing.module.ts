import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'clients',
    loadChildren: () => import("@pages/clients/clients.module").then(c => c.ClientsModule)
  },
  {
    path: 'services',
    loadChildren: () => import("@pages/company-services/company-services.module").then(c => c.CompanyServicesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
