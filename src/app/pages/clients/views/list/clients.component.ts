import { DeleteDialogService } from '@root/app/services/dialog/delete-dialog.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ColumnItem } from '@root/app/shared/components/table/table.component';
import { isClientLoading, selectActiveClients } from '@pages/clients/store/clients.selectors';
import { ClientModel } from '@pages/clients/model/Clients.model';
import { clientsPageActions } from '@pages/clients/store/clients.actions';
import { Router } from '@angular/router';
import { UnsubscribeComponent } from '@root/app/utils/unsubscribe';
import { AppState } from '@root/app/app-state';
import { FieldType } from '@root/app/shared/components/form/items.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent extends UnsubscribeComponent implements OnInit {
  columns: ColumnItem[] = [
    { name: 'Name', value: 'name', type: FieldType.input },
    { name: 'Description', value: 'description', type: FieldType.input },
    { name: 'Owner', value: 'owner', type: FieldType.input },
    { name: 'Responsible', value: 'responsible', type: FieldType.input },
    { name: 'Area', value: 'area', type: FieldType.input },
    { name: 'IsActive', value: 'isActive', type: FieldType.YesNo },
  ];

  data: Observable<ClientModel[]> = this.store.select(selectActiveClients);
  isLoading: Observable<boolean> = this.store.select(isClientLoading);

  private selected!: ClientModel | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: DeleteDialogService
  ) { super(); }

  ngOnInit(): void {
    this.store.dispatch(clientsPageActions.selectClient({ client: null }));
    this.store.dispatch(clientsPageActions.loadClients());
  }

  selectClient(client: ClientModel | null) {
    this.selected = client;
    this.store.dispatch(clientsPageActions.selectClient({ client }));
  }

  addClient() {
    this.router.navigate(['/clients/new']);
  }

  editClient() {
    this.router.navigate([`/clients/${this.selected?.id}`]);
  }

  removeClient() {
    this.dialog.openDialog({ pageName: 'Cliente', register: this.selected?.name as string });
    this.subs.add(this.dialog.afterClosed().subscribe(response => {
      if(response) {
        this.store.dispatch(clientsPageActions.deleteClient());
      }
    }))
  }
}
