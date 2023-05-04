import { ClientModel } from "../model/Clients.model";
import { clientsPageActions } from "./clients.actions";
import { ClientState } from "./clients.reducer";
import { clientsReducer } from "./clients.reducer";

describe('ClientReducer', () => {
  it('should field selectedClient and selectedClientId correctly on selectClient', () => {
    const selectedState = clientsReducer(setupInitialState(), clientsPageActions.selectClient({ client: setupClient('1') }));

    expect(selectedState.selectedClient).toEqual(setupClient('1'));
    expect(selectedState.selectedClientId).toBe('1');

    const nonSelectedState = clientsReducer(setupInitialState(), clientsPageActions.selectClient({ client: null }));

    expect(nonSelectedState.selectedClient).toBeNull();
    expect(nonSelectedState.selectedClientId).toBeUndefined();
  });

  it('should find in loaded items when match id on getClientById', () => {
    const state = clientsReducer(setupInitialState(), clientsPageActions.getClientById({ id: '3'}));

    expect(state.selectedClient).toEqual(setupClient('3'));
    expect(state.selectedClientId).toBe('3');
  });

  it('should set  errorOnLoadClients to false and isClientLoading to true on loadClients', () => {
    const currentState = setupInitialState();
    currentState.errorOnLoadClients = true;
    currentState.isClientLoading = false

    const state = clientsReducer(currentState, clientsPageActions.loadClients());

    expect(state.errorOnLoadClients).toBeFalsy();
    expect(state.isClientLoading).toBeTruthy();
  });

  it('should set clients with list provided and isClientLoading to false on successOnLoadClients', () => {
    const currentState = setupInitialState();
    currentState.isClientLoading = true

    const state = clientsReducer(currentState, clientsPageActions.successOnLoadClients({ clients: [setupClient('123456789')] }));

    expect(state.clients).toEqual([setupClient('123456789')]);
    expect(state.isClientLoading).toBeFalsy();
  });

  it('should set errorOnLoadClients to true and isClientLoading to false on errorOnLoadClients', () => {
    const currentState = setupInitialState();
    currentState.isClientLoading = true
    currentState.errorOnLoadClients = false

    const state = clientsReducer(currentState, clientsPageActions.errorOnLoadClients());

    expect(state.isClientLoading).toBeFalsy();
    expect(state.errorOnLoadClients).toBeTruthy();
  });

  it('should set newClient client provided, errorOnAddClients to false and isClientLoading to true on addClient', () => {
    const currentState = setupInitialState();
    currentState.isClientLoading = false
    currentState.errorOnAddClients = false

    const state = clientsReducer(currentState, clientsPageActions.addClient({ client: setupClient('12345789') }));

    expect(state.newClient).toEqual(setupClient('12345789'));
    expect(state.isClientLoading).toBeTruthy();
    expect(state.errorOnAddClients).toBeFalsy();
  });

  it('should set newClient null improve clients with provided client and isClientLoading to true on successOnAddClient', () => {
    const currentState = setupInitialState();
    const newClient = setupClient('12345789');
    currentState.isClientLoading = true
    currentState.clients = []
    currentState.newClient = newClient;

    const state = clientsReducer(currentState, clientsPageActions.successOnAddClient({ client: newClient }));

    expect(state.newClient).toBeNull();
    expect(state.isClientLoading).toBeFalsy();
    expect(state.errorOnAddClients).toBeFalsy();
    expect(state.clients).toHaveLength(1);
    expect(state.clients.at(0)).toEqual(newClient);
  });

  it('should set errorOnAddClient to true and isClientLoading to false on errorOnAddClient', () => {
    const currentState = setupInitialState();
    const newClient = setupClient('12345789');
    currentState.isClientLoading = true
    currentState.errorOnAddClients = false
    currentState.newClient = newClient;

    const state = clientsReducer(currentState, clientsPageActions.errorOnAddClient());

    expect(state.newClient).toEqual(newClient);
    expect(state.isClientLoading).toBeFalsy();
    expect(state.errorOnAddClients).toBeTruthy();
  });

  it('should set errorOnEditClients to false and isClientLoading to true on editClient', () => {
    const currentState = setupInitialState();
    const editedClient = setupClient('1');
    editedClient.name = 'new_name';

    currentState.isClientLoading = false
    currentState.errorOnEditClients = true
    currentState.selectedClient = null
    currentState.selectedClientId = undefined

    const state = clientsReducer(currentState, clientsPageActions.editClient({ client: editedClient }));

    expect(state.isClientLoading).toBeTruthy();
    expect(state.errorOnAddClients).toBeFalsy();
    expect(state.selectedClient).toEqual(editedClient);
    expect(state.selectedClientId).toBe(editedClient.id);
  });

  it('should set update clients list with editedClient and isClientLoading to false on successOnEditClient', () => {
    const currentState = setupInitialState();
    const editedClient = setupClient('1');
    editedClient.name = 'new_name';

    currentState.isClientLoading = true;
    currentState.selectedClient = editedClient;
    currentState.selectedClientId = editedClient.id;

    const state = clientsReducer(currentState, clientsPageActions.successOnEditClient({ client: editedClient }));

    expect(state.isClientLoading).toBeFalsy();
    expect(state.clients.find(client => client.id === '1')).toEqual(editedClient);
  });

  it('should set errorOnEditClients to true and isClientLoading to false on errorOnEditClient', () => {
    const currentState = setupInitialState();

    currentState.isClientLoading = true;
    currentState.errorOnEditClients = false;

    const state = clientsReducer(currentState, clientsPageActions.errorOnEditClient());

    expect(state.isClientLoading).toBeFalsy();
    expect(state.errorOnEditClients).toBeTruthy();
  });

  it('should set errorOnDeleteClients to false and isClientLoading to true on deleteClient', () => {
    const currentState = setupInitialState();

    currentState.isClientLoading = false;
    currentState.errorOnDeleteClients = true;

    const state = clientsReducer(currentState, clientsPageActions.deleteClient());

    expect(state.isClientLoading).toBeTruthy();
    expect(state.errorOnDeleteClients).toBeFalsy();
  });

  it('should set selectedClient to null and isClientLoading to false on successOnDeleteClient', () => {
    const currentState = setupInitialState();

    currentState.isClientLoading = true;
    currentState.selectedClient = currentState.clients.at(0) as ClientModel;
    const currentClientSize = currentState.clients.length
    const state = clientsReducer(currentState, clientsPageActions.successOnDeleteClient());

    expect(state.isClientLoading).toBeFalsy();
    expect(state.selectedClient).toBeNull();
    expect(state.clients).toHaveLength(currentClientSize - 1);
  });

  it('should set isClientLoading to false on errorOnDeleteClient', () => {
    const currentState = setupInitialState();

    currentState.isClientLoading = true;
    const currentClientSize = currentState.clients.length
    const state = clientsReducer(currentState, clientsPageActions.errorOnDeleteClient());

    expect(state.isClientLoading).toBeFalsy();
    expect(state.clients).toHaveLength(currentClientSize);
  });
});

function setupClient(id?: string): ClientModel {
  return {
    id,
    name: 'name',
    description: 'description',
    responsible: 'responsible',
    area: 'area',
    owner: 'owner',
    isActive: true,
    contacts: [],
    contracts: [],
    payments: []
  }
}

function setupInitialState(): ClientState {
  return {
    clients: [setupClient('1'), setupClient('2'), setupClient('3')],
    newClient: null,
    selectedClient: null,
    isClientLoading: false,
    errorOnAddClients: false,
    errorOnEditClients: false,
    errorOnDeleteClients: false,
    errorOnLoadClients: false
  }
}

