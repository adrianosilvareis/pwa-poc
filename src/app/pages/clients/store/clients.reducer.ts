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
  on(clientsPageActions.addClient, (state, { client }) => ({ ...state, newClient: client, errorOnAddClients: false, isClientLoading: true })),
  on(clientsPageActions.successOnAddClient, (state, { client }) => ({ ...state, clients: [...state.clients, client], newClient: null, isClientLoading: false })),
  on(clientsPageActions.errorOnAddClient, (state) => ({ ...state, errorOnAddClients: true, isClientLoading: false })),
  // edit
  on(clientsPageActions.editClient, (state, { client }) => ({ ...state, errorOnEditClients: false, selectedClient: client, selectedClientId: client.id, isClientLoading: true })),
  on(clientsPageActions.successOnEditClient, (state, { client }) => ({ ...state, clients: updateClient(state.selectedClient as ClientModel, client, state.clients), isClientLoading: false })),
  on(clientsPageActions.errorOnEditClient, (state) => ({ ...state, errorOnEditClients: true, isClientLoading: false })),
  // delete
  on(clientsPageActions.deleteClient, (state) => ({ ...state, errorOnDeleteClients: false, isClientLoading: true })),
  on(clientsPageActions.successOnDeleteClient, (state) => ({ ...state, clients: removeClient(state.selectedClient as ClientModel, state.clients), selectedClient: null, isClientLoading: false })),
  on(clientsPageActions.errorOnDeleteClient, (state) => ({ ...state, errorOnDeleteClients: true, isClientLoading: false })),
);

function getClientById(id: string, clients: ClientModel[]) {
  return clients.find(client => client.id === id) ?? null;
}

function updateClient(currentClient: ClientModel, updatedClient: ClientModel, clients: ClientModel[]) {
  return clients.map(client => client.id === currentClient.id ? updatedClient : client);
}

function removeClient(currentClient: ClientModel, clients: ClientModel[]) {
  return clients.filter(client => client.id !== currentClient.id);
}
