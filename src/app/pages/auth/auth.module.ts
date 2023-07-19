import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './view/login/login.component';
import { MaterialModule } from '@root/app/material/material.module';
import { FormModule } from '@root/app/shared/components/form/form.module';
import { SharedModule } from '@root/app/shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormModule,
    SharedModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
