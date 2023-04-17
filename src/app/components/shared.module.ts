import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '@app/material/material.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    ListComponent,
    ToolbarComponent,
    TableComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    ListComponent,
    ToolbarComponent,
    TableComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
