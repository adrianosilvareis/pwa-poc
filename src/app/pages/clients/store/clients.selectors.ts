import { ClientState } from "./clients.reducer";

export interface AppState {
  client: ClientState
}

export const newClient = ({ client: state }: AppState) => state.newClient;
export const isClientLoading = ({ client: state }: AppState) => state.isClientLoading;
export const selectedClient = ({ client: state }: AppState) => state.selectedClient;
export const selectedClientId = ({ client: state }: AppState) => state.selectedClientId;
export const selectActiveClients = ({ client: state }: AppState) => state.clients.filter(({isActive}) => isActive);
