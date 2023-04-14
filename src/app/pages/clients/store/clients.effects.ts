import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, withLatestFrom } from 'rxjs/operators';
import { ClientsService } from '../services/clients.service';
import { clientsPageActions } from './clients.actions';
import { Store } from '@ngrx/store';
import { AppState, newClient, selectActiveClients, selectedClient } from './clients.selectors';
import { ClientModel } from '../model/Clients.model';

@Injectable()
export class ClientsEffects {

  loadClients$ = createEffect(() => this.actions$.pipe(
    ofType(clientsPageActions.loadClients),
    withLatestFrom(this.store.select(selectActiveClients)),
    exhaustMap(([actions, clients]) => this.loadClients(clients)))
  );

  addClients$ = createEffect(() => this.actions$.pipe(
    ofType(clientsPageActions.addClient),
    withLatestFrom(this.store.select(newClient)),
    exhaustMap(([actions, client]) => this.addClients(client as ClientModel)))
  );

  editClients$ = createEffect(() => this.actions$.pipe(
    ofType(clientsPageActions.editClient),
    withLatestFrom(this.store.select(selectedClient)),
    exhaustMap(([actions, client]) => this.editClients(client as ClientModel)))
  );

  deleteClients$ = createEffect(() => this.actions$.pipe(
    ofType(clientsPageActions.deleteClient),
    withLatestFrom(this.store.select(selectedClient)),
    exhaustMap(([actions, client]) => this.deleteClients(client as ClientModel)))
  );

  constructor(
    private actions$: Actions,
    private clientsService: ClientsService,
    private store: Store<AppState>
  ) {}

  private loadClients(clients: ClientModel[]) {
    return clients.length > 0 ?
      of(clientsPageActions.successOnLoadClients({ clients })):
      this.clientsService.loadClients()
        .pipe(
          map(clients => clientsPageActions.successOnLoadClients({ clients })),
          catchError(() => of(clientsPageActions.errorOnLoadClients()))
        )
  }

  private addClients(newClient: ClientModel) {
    return this.clientsService.addClients(newClient)
      .pipe(
        map(client => clientsPageActions.successOnAddClient({ client })),
        catchError(() => of(clientsPageActions.errorOnAddClient()))
      )
  }

  private editClients(client: ClientModel) {
    return this.clientsService.editClients(client)
      .pipe(
        map(client => clientsPageActions.successOnEditClient({ client })),
        catchError(() => of(clientsPageActions.errorOnEditClient()))
      )
  }

  private deleteClients(client: ClientModel) {
    return this.clientsService.deleteClients(client)
      .pipe(
        map(() => clientsPageActions.successOnDeleteClient()),
        catchError(() => of(clientsPageActions.errorOnDeleteClient()))
      )
  }


}
