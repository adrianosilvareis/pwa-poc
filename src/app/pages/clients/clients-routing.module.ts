import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsPage } from './views/list/clients.page';
import { ClientFormPage } from './views/client-form/client-form.page';

const routes: Routes = [
  { path: '', title:"Clients", component: ClientsPage },
  { path: 'new', title:"Clients", component: ClientFormPage },
  { path: ':id', title:"Clients", component: ClientFormPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
