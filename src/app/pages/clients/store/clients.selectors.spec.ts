import { ClientModel } from "../model/Clients.model";
import { AppState, isClientLoading, newClient, selectActiveClients, selectedClient, selectedClientId } from "./clients.selectors";

describe("Selectors", () => {
  const initialState: AppState = setupInitialStatus();

  it("should return newClient", () => {
    const result = newClient({ client: initialState.client });
    expect(result).toEqual(setupClient());
  });

  it("should return isClientLoading", () => {
    const result = isClientLoading({ client: initialState.client });
    expect(result).toBeFalsy();
  });

  it("should return selectedClient", () => {
    const result = selectedClient({ client: initialState.client });
    expect(result).toEqual(setupClient());
  });

  it("should return selectedClientId", () => {
    const result = selectedClientId({ client: initialState.client });
    expect(result).toEqual('MY_ID');
  });

  it("should return selectActiveClients", () => {
    const result = selectActiveClients({ client: initialState.client });
    expect(result).toEqual(initialState.client.clients);
  });
});


function setupClient(): ClientModel {
  return {
    id: 'MY_ID',
    name: 'name',
    description: 'description',
    responsible: 'responsible',
    area: 'area',
    owner: 'owner',
    isActive: true,
  }
}

function setupInitialStatus():AppState {
  return {
    client: {
      clients: [setupClient()],
      newClient: setupClient(),
      selectedClient: setupClient(),
      selectedClientId: 'MY_ID',
      isClientLoading: false,
      errorOnAddClients: false,
      errorOnEditClients: false,
      errorOnDeleteClients: false,
      errorOnLoadClients: false
    }
  }
}
