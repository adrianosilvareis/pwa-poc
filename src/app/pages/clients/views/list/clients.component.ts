import { DeleteDialogService } from '@root/app/services/dialog/delete-dialog.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ColumnItem } from '@root/app/components/table/table.component';
import { AppState, isClientLoading, selectActiveClients } from '@pages/clients/store/clients.selectors';
import { ClientModel } from '@pages/clients/model/Clients.model';
import { clientsPageActions } from '@pages/clients/store/clients.actions';
import { Router } from '@angular/router';
import { Unsubscribe } from '@root/app/utils/unsubscribe';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent extends Unsubscribe implements OnInit {
  columns: ColumnItem[] = [
    { name: 'Name', value: 'name' },
    { name: 'Description', value: 'description' },
    { name: 'Owner', value: 'owner' },
    { name: 'Responsible', value: 'responsible' },
    { name: 'Area', value: 'area' },
    { name: 'IsActive', value: 'isActive' },
  ];

  data: Observable<ClientModel[]> = this.store.select(selectActiveClients);
  isLoading: Observable<boolean> = this.store.select(isClientLoading);

  private selectedId!: string;

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
    this.selectedId = client?.id as string;
    this.store.dispatch(clientsPageActions.selectClient({ client }));
  }

  addClient() {
    this.router.navigate(['/clients/new']);
  }

  editClient() {
    this.router.navigate([`/clients/${this.selectedId}`]);
  }

  removeClient(event: any) {
    this.dialog.openDialog({ pageName: 'Cliente', register: event.name });
    this.subs.add(this.dialog.afterClosed().subscribe(response => {
      if(response) {
        this.store.dispatch(clientsPageActions.deleteClient());
      }
    }))
  }
}
