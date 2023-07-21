import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsPage } from './views/contracts/contracts.page';
import { ContractsFormPage } from './views/contracts-form/contracts-form.page';

const routes: Routes = [
  { path: '', title:"Contracts", component: ContractsPage },
  { path: 'new', title:"Contracts", component: ContractsFormPage },
  { path: ':id', title:"Contracts", component: ContractsFormPage },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
