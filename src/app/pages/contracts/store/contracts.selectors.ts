import { createSelector } from "@ngrx/store";
import { AppState } from "@root/app/app-state";
import { ContractsState } from "./contracts.reducer";

export const selectContract = (state: Partial<AppState>) => state.contract as ContractsState;

export const newContract = createSelector(selectContract, (state: ContractsState) => state.newContract);
export const isContractLoading = createSelector(selectContract, (state: ContractsState) => state.isContractLoading);
export const selectedContract = createSelector(selectContract, (state: ContractsState) => state.selectedContract);
export const selectedContractId = createSelector(selectContract, (state: ContractsState) => state.selectedContractId);
export const selectActiveContracts = createSelector(selectContract, (state: ContractsState) => state.contracts.filter(({isActive}) => isActive));
