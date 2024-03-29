import { createSelector } from "@ngrx/store";
import { AppState } from "@root/app/app-state";
import { ContractsState } from "./contracts.reducer";
import { selectClients } from "@pages/clients/store/clients.selectors";

export const selectContractState = (state: Partial<AppState>) => state.contract as ContractsState;

export const newContract = createSelector(selectContractState, (state: ContractsState) => state.newContract);
export const isContractLoading = createSelector(selectContractState, (state: ContractsState) => state.isContractLoading);
export const selectedContract = createSelector(selectContractState, (state: ContractsState) => state.selectedContract);
export const selectedContractId = createSelector(selectContractState, (state: ContractsState) => state.selectedContractId);
export const selectActiveContracts = createSelector(selectContractState, (state: ContractsState) => state.contracts.filter(({isActive}) => isActive));
export const selectContracts = createSelector(selectContractState, (state: ContractsState) => state.contracts);
export const selectContractsList = createSelector(selectContracts, selectClients, (contracts, clients) => {
  return contracts.map(contract => {
    const client = clients.find(client => client.id === contract.client);
    return {
      ...contract,
      clientName: client?.name || ''
    }
  });
});
