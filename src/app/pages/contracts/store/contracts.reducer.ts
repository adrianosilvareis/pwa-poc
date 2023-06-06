import { createReducer, on } from "@ngrx/store";
import { ContractsModel } from "../model/contracts.models";
import { contractsPageActions } from "./contracts.actions";

export interface ContractsState {
  contracts: ContractsModel[],
  newContract: ContractsModel | null,
  selectedContract: ContractsModel | null,
  selectedContractId?: string,
  isContractLoading: boolean,
  errorOnLoadContracts: boolean,
  errorOnAddContracts: boolean,
  errorOnEditContracts: boolean,
  errorOnDeleteContracts: boolean
}

export const initialState: ContractsState = {
  contracts: [],
  newContract: null,
  selectedContract: null,
  selectedContractId: undefined,
  isContractLoading: false,
  errorOnLoadContracts: false,
  errorOnAddContracts: false,
  errorOnEditContracts: false,
  errorOnDeleteContracts: false,
};

export const contractsReducer = createReducer(
  initialState,
  // select
  on(contractsPageActions.selectContract, (state, { contract }) => ({ ...state, selectedContract: contract, selectedContractId: contract ? contract.id : undefined })),
  on(contractsPageActions.getContractById, (state, { id }) => ({ ...state, selectedContract: getContractById(id, state.contracts), selectedContractId: id })),
  // load
  on(contractsPageActions.loadContracts, (state) => ({ ...state, errorOnLoadContracts: false, isContractLoading: true })),
  on(contractsPageActions.successOnLoadContracts, (state, { contracts }) => ({ ...state, contracts, isContractLoading: false })),
  on(contractsPageActions.errorOnLoadContracts, (state) => ({ ...state, errorOnLoadContracts: true, isContractLoading: false })),
  // add
  on(contractsPageActions.addContract, (state, { contract }) => ({ ...state, newContract: contract, errorOnAddContracts: false, isContractLoading: true })),
  on(contractsPageActions.successOnAddContract, (state, { contract }) => ({ ...state, contracts: [...state.contracts, contract], newContract: null, isContractLoading: false })),
  on(contractsPageActions.errorOnAddContract, (state) => ({ ...state, errorOnAddContracts: true, isContractLoading: false })),
  // edit
  on(contractsPageActions.editContract, (state, { contract }) => ({ ...state, errorOnEditContracts: false, selectedContract: contract, selectedContractId: contract.id, isContractLoading: true })),
  on(contractsPageActions.successOnEditContract, (state, { contract }) => ({ ...state, contracts: updateContract(state.selectedContract as ContractsModel, contract, state.contracts), isContractLoading: false })),
  on(contractsPageActions.errorOnEditContract, (state) => ({ ...state, errorOnEditContracts: true, isContractLoading: false })),
  // delete
  on(contractsPageActions.deleteContract, (state) => ({ ...state, errorOnDeleteContracts: false, isContractLoading: true })),
  on(contractsPageActions.successOnDeleteContract, (state) => ({ ...state, contracts: removeContract(state.selectedContract as ContractsModel, state.contracts), selectedContract: null, isContractLoading: false })),
  on(contractsPageActions.errorOnDeleteContract, (state) => ({ ...state, errorOnDeleteContracts: true, isContractLoading: false })),
);

function getContractById(id: string, contracts: ContractsModel[]) {
  return contracts.find(contract => contract.id === id) ?? null;
}

function updateContract(currentContract: ContractsModel, updatedContract: ContractsModel, contracts: ContractsModel[]) {
  return contracts.map(contract => contract.id === currentContract.id ? updatedContract : contract);
}

function removeContract(currentContract: ContractsModel, contracts: ContractsModel[]) {
  return contracts.filter(contract => contract.id !== currentContract.id);
}
