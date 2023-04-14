import { ClientState } from "./clients.reducer";

export interface AppState {
  client: ClientState
}

export const newClient = ({ client: state }: AppState) => state.newClient;
export const selectedClient = ({ client: state }: AppState) => state.selectedClient;
export const selectClients = ({ client: state }: AppState) => state.clients;
export const selectActiveClients = ({ client: state }: AppState) => state.clients.filter(({isActive}) => isActive);
export const selectLoadClientStatus = ({ client: state }: AppState) => state.errorOnLoadClients;
