import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './view/login/login.page';

const routes: Routes = [
  { path: '', title:"Login", component: LoginPage },
  { path: 'register', title:"Register", component: LoginPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
