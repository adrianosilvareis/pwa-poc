import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './views/list/clients.component';
import { ClientFormComponent } from './views/client-form/client-form.component';

const routes: Routes = [
  { path: '', title:"Clients", component: ClientsComponent },
  { path: 'new', title:"Clients", component: ClientFormComponent },
  { path: ':id', title:"Clients", component: ClientFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
