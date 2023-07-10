import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ListComponent } from '@components/list/list.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { TableComponent } from '@components/table/table.component';
import { MaterialModule } from '@app/material/material.module';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from '@components/loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteDialogComponent } from '@components/delete-dialog/delete-dialog.component';
import { CurrencyFormatterDirective } from '@directives/currency/currency-formatter.directive';
import { ErrorMessagePipe } from '@pipes/error-message/error-message.pipe';
import { FormatTableValueDirective } from '@directives/format-table-value/format-table-value.directive';

@NgModule({
  declarations: [
    ListComponent,
    ToolbarComponent,
    TableComponent,
    LoadingComponent,
    DeleteDialogComponent,
    ErrorMessagePipe,
    CurrencyFormatterDirective,
    FormatTableValueDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports:[
    ListComponent,
    ToolbarComponent,
    TableComponent,
    LoadingComponent,
    ErrorMessagePipe,
    CurrencyFormatterDirective,
    FormatTableValueDirective
  ],
  providers: [
    CurrencyPipe
  ]
})
export class SharedModule { }
