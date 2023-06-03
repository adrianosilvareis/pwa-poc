import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '@app/material/material.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { PipeModule } from '@root/app/pipe/pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    ListComponent,
    ToolbarComponent,
    TableComponent,
    LoadingComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    PipeModule,
    ReactiveFormsModule
  ],
  exports:[
    ListComponent,
    ToolbarComponent,
    TableComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
