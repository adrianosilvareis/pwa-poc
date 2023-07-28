import { DeleteDialogService } from '@root/app/services/dialog/delete-dialog.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ColumnItem } from '@root/app/shared/components/table/table.component';
import { isClientLoading, selectActiveClients } from '@pages/clients/store/clients.selectors';
import { ClientModel } from '@pages/clients/model/Clients.model';
import { clientsPageActions } from '@pages/clients/store/clients.actions';
import { Router } from '@angular/router';
import { Unsubscribe } from '@root/app/utils/unsubscribe';
import { AppState } from '@root/app/app-state';
import { FieldType } from '@root/app/shared/components/form/protocols/field-type';
import { TableColumnsService } from '@root/app/services/table-columns/table-columns.service';

@Component({
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss']
})
export class ClientsPage extends Unsubscribe implements OnInit {
  columns!: ColumnItem[];

  data: Observable<ClientModel[]> = this.store.select(selectActiveClients);
  isLoading: Observable<boolean> = this.store.select(isClientLoading);

  private selected!: ClientModel | null;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialog: DeleteDialogService,
    private columnBuild: TableColumnsService
  ) { super(); }

  ngOnInit(): void {
    this._configTable();
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

  private _configTable() {
    this.columns = this.columnBuild
      .addItem({ name: 'Name' })
      .addItem({ name: 'Description' })
      .addItem({ name: 'Responsible' })
      .addItem({ name: 'Area' })
      .addItem({ name: 'Owner' })
      .addItem({ name: 'IsActive', type: FieldType.YesNo })
      .build();
  }
}
