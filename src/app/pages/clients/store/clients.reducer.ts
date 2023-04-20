import { createReducer, on } from '@ngrx/store';
import { clientsPageActions } from './clients.actions';
import { ClientModel } from '@pages/clients/model/Clients.model';

export interface ClientState {
  clients: ClientModel[],
  newClient: ClientModel | null,
  selectedClient: ClientModel | null,
  selectedClientId?: string,
  isClientLoading: boolean,
  errorOnLoadClients: boolean,
  errorOnAddClients: boolean,
  errorOnEditClients: boolean,
  errorOnDeleteClients: boolean
}

export const initialState: ClientState = {
  clients: [],
  newClient: null,
  selectedClient: null,
  isClientLoading: false,
  errorOnLoadClients: false,
  errorOnAddClients: false,
  errorOnEditClients: false,
  errorOnDeleteClients: false
};

export const clientsReducer = createReducer(
  initialState,
  // select
  on(clientsPageActions.selectClient, (state, { client }) => ({ ...state, selectedClient: client, selectedClientId: client ? client.id : undefined })),
  on(clientsPageActions.getClientById, (state, { id }) => ({ ...state, selectedClient: getClientById(id, state.clients), selectedClientId: id })),
  // load
  on(clientsPageActions.loadClients, (state) => ({ ...state, errorOnLoadClients: false, isClientLoading: true })),
  on(clientsPageActions.successOnLoadClients, (state, { clients }) => ({ ...state, clients, isClientLoading: false })),
  on(clientsPageActions.errorOnLoadClients, (state) => ({ ...state, errorOnLoadClients: true, isClientLoading: false })),
  // add
  on(clientsPageActions.addClient, (state, { client }) => ({ ...state, newClient: client, errorOnAddClients: false })),
  on(clientsPageActions.successOnAddClient, (state, { client }) => ({ ...state, clients: [...state.clients, client], newClient: null })),
  on(clientsPageActions.errorOnAddClient, (state) => ({ ...state, errorOnAddClients: true })),
  // edit
  on(clientsPageActions.editClient, (state, { client }) => ({ ...state, errorOnEditClients: false, selectedClient: client, selectedClientId: client.id })),
  on(clientsPageActions.successOnEditClient, (state, { client }) => ({ ...state, clients: updateClient(state.selectedClient as ClientModel, client, state.clients) })),
  on(clientsPageActions.errorOnEditClient, (state) => ({ ...state, errorOnEditClients: true })),
  // delete
  on(clientsPageActions.deleteClient, (state) => ({ ...state, errorOnDeleteClients: false })),
  on(clientsPageActions.successOnDeleteClient, (state) => ({ ...state, clients: removeClient(state.selectedClient as ClientModel, state.clients), selectedClient: null })),
  on(clientsPageActions.errorOnDeleteClient, (state) => ({ ...state, errorOnDeleteClients: true })),
);

function getClientById(id: string, clients: ClientModel[]) {
  return clients.find(client => client.id === id) ?? null;
}

function updateClient(currentClient: ClientModel, updatedClient: ClientModel, clients: ClientModel[]) {
  return clients.map(client => client === currentClient ? updatedClient : client);
}

function removeClient(currentClient: ClientModel, clients: ClientModel[]) {
  return clients.filter(client => client !== currentClient);
}
