import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ColumnItem } from '@root/app/components/table/table.component';
import { AppState, isClientLoading, selectActiveClients } from '../../store/clients.selectors';
import { ClientModel } from '../../model/Clients.model';
import { clientsPageActions } from '../../store/clients.actions';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(clientsPageActions.loadClients());
  }

  selectClient(client: ClientModel | null) {
    this.store.dispatch(clientsPageActions.selectClient({ client }))
  }

  addClient() {
    // logica de redirect para pagina de newClient, onde deve preencher o formulário com os valores importantes
    this.store.dispatch(clientsPageActions.addClient({
      client: {
        name: 'name',
        description: 'description',
        owner: 'owner',
        responsible: 'responsible',
        area: 'area',
        isActive: true
      }
    }));
  }

  editClient() {
    // criar logica para redirecionar a tela de edição onde deve preencher o formulário antes de salvar os valores
    this.store.dispatch(clientsPageActions.editClient());
  }

  removeClient(event: any) {
    // abrir modal de confirmação antes de chamar a action de delete
    this.store.dispatch(clientsPageActions.deleteClient());
  }
}
