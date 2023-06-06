import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsComponent } from './views/contracts/contracts.component';
import { ContractsFormComponent } from './views/contracts-form/contracts-form.component';

const routes: Routes = [
  { path: '', title:"Contracts", component: ContractsComponent },
  { path: 'new', title:"Contracts", component: ContractsFormComponent },
  { path: ':id', title:"Contracts", component: ContractsFormComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
