import { Component, OnInit } from '@angular/core';
import { ColumnItem } from '@root/app/components/table/table.component';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { DeleteDialogService } from '@root/app/services/dialog/delete-dialog.service';
import { Unsubscribe } from '@root/app/utils/unsubscribe';
import { AppState } from '@root/app/app-state';
import { isServiceLoading, selectActiveServices } from '../../store/company-services.selectors';
import { CompanyServicesModel } from '../../model/company-services.model';
import { Observable } from 'rxjs';
import { servicesPageActions } from '../../store/company-services.actions';

@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.component.html',
  styleUrls: ['./company-services.component.scss']
})
export class CompanyServicesComponent extends Unsubscribe implements OnInit{
  columns: ColumnItem[] = [
    { name: 'Title', value: 'title' },
    { name: 'Description', value: 'description' },
    { name: 'Value', value: 'value' },
  ];

  data: Observable<CompanyServicesModel[]> = this.store.select(selectActiveServices);
  isLoading: Observable<boolean> = this.store.select(isServiceLoading);

  private selectedId!: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: DeleteDialogService
  ) { super(); }

  ngOnInit(): void {
    this.store.dispatch(servicesPageActions.selectService({ service: null }));
    this.store.dispatch(servicesPageActions.loadServices());
  }

  selectService(service: CompanyServicesModel | null) {
    this.selectedId = service?.id as string;
    this.store.dispatch(servicesPageActions.selectService({ service }));
  }

  addService() {
    this.router.navigate(['/services/new']);
  }

  editService() {
    this.router.navigate([`/services/${this.selectedId}`]);
  }

  removeService(event: any) {
    this.dialog.openDialog({ pageName: 'Serviço', register: event.title });
    this.subs.add(this.dialog.afterClosed().subscribe(response => {
      if(response) {
        this.store.dispatch(servicesPageActions.deleteService());
      }
    }));
  }
}
