import { ClientModel } from "../model/Clients.model";
import { ClientState } from "./clients.reducer";
import { isClientLoading, newClient, selectActiveClients, selectedClient, selectedClientId } from "./clients.selectors";

describe("Selectors", () => {
  const initialState = setupInitialStatus();

  it("should return newClient", () => {
    const result = newClient(initialState);
    expect(result).toEqual(setupClient());
  });

  it("should return isClientLoading", () => {
    const result = isClientLoading(initialState);
    expect(result).toBeFalsy();
  });

  it("should return selectedClient", () => {
    const result = selectedClient(initialState);
    expect(result).toEqual(setupClient());
  });

  it("should return selectedClientId", () => {
    const result = selectedClientId(initialState);
    expect(result).toEqual('MY_ID');
  });

  it("should return selectActiveClients", () => {
    const result = selectActiveClients(initialState);
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

function setupInitialStatus():{ client: ClientState } {
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
