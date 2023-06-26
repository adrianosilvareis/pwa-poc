import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from '@app/material/material.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { PipeModule } from '@root/app/pipe/pipe.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CurrencyFormatterDirective } from '@directives/currency/currency-formatter.directive';

@NgModule({
  declarations: [
    ListComponent,
    ToolbarComponent,
    TableComponent,
    LoadingComponent,
    DeleteDialogComponent,
    CurrencyFormatterDirective
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
