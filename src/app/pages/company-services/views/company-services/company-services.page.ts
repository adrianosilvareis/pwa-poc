import { Component, OnInit } from '@angular/core';
import { ColumnItem } from '@root/app/shared/components/table/table.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { DeleteDialogService } from '@root/app/services/dialog/delete-dialog.service';
import { Unsubscribe } from '@root/app/utils/unsubscribe';
import { AppState } from '@root/app/app-state';
import { isServiceLoading, selectActiveServices } from '@pages/company-services/store/company-services.selectors';
import { CompanyServicesModel } from '@pages/company-services/model/company-services.model';
import { Observable } from 'rxjs';
import { servicesPageActions } from '@pages/company-services/store/company-services.actions';
import { FieldType } from '@root/app/shared/components/form/items.model';
import { TableColumnsService } from '@root/app/services/table-columns/table-columns.service';

@Component({
  templateUrl: './company-services.page.html',
  styleUrls: ['./company-services.page.scss']
})
export class CompanyServicesPage extends Unsubscribe implements OnInit{
  columns!: ColumnItem[];

  data: Observable<CompanyServicesModel[]> = this.store.select(selectActiveServices);
  isLoading: Observable<boolean> = this.store.select(isServiceLoading);

  private selected!: CompanyServicesModel | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: DeleteDialogService,
    private columnBuild: TableColumnsService,
  ) { super(); }

  ngOnInit(): void {
    this._configColumns();
    this.store.dispatch(servicesPageActions.selectService({ service: null }));
    this.store.dispatch(servicesPageActions.loadServices());
  }

  selectService(service: CompanyServicesModel | null) {
    this.selected = service;
    this.store.dispatch(servicesPageActions.selectService({ service }));
  }

  addService() {
    this.router.navigate(['/services/new']);
  }

  editService() {
    this.router.navigate([`/services/${this.selected?.id}`]);
  }

  removeService() {
    this.dialog.openDialog({ pageName: 'Serviço', register: this.selected?.title as string });
    this.subs.add(this.dialog.afterClosed().subscribe(response => {
      if(response) {
        this.store.dispatch(servicesPageActions.deleteService());
      }
    }));
  }

  private _configColumns() {
    this.columns = this.columnBuild
      .addItem({ name: 'Title' })
      .addItem({ name: 'Description' })
      .addItem({ name: 'Value', type: FieldType.currency })
      .build()
  }
}
