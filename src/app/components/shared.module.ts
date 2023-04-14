import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    ListComponent,
    ToolbarComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports:[
    ListComponent,
    ToolbarComponent,
    TableComponent
  ]
})
export class SharedModule { }
