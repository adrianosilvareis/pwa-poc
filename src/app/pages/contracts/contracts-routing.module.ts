import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsComponent } from './views/contracts/contracts.component';

const routes: Routes = [
  { path: '', title:"Contracts", component: ContractsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
