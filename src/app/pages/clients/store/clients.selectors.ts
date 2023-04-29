import { createSelector } from "@ngrx/store";
import { ClientState } from "./clients.reducer";
import { AppState } from "@root/app/app-state";

export const selectClient = (state: Partial<AppState>) => state.client as ClientState;

export const newClient = createSelector(selectClient, state => state.newClient);
export const isClientLoading = createSelector(selectClient, state => state.isClientLoading);
export const selectedClient = createSelector(selectClient, state => state.selectedClient);
export const selectedClientId = createSelector(selectClient, state => state.selectedClientId);
export const selectActiveClients = createSelector(selectClient, state => state.clients.filter(({isActive}) => isActive));
