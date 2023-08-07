import { ContractsModel } from "@pages/contracts/model/contracts.models";
import { contractsPageActions } from "./contracts.actions";
import { ContractsState, contractsReducer } from "./contracts.reducer";
import MockDate from 'mockdate'

describe('ContractsReducer', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should field selectedContract and selectedContractId correctly on selectContract', () => {
    const selectedState = contractsReducer(setupInitialState(), contractsPageActions.selectContract({ contract: setupContract('1') }));

    expect(selectedState.selectedContract).toEqual(setupContract('1'));
    expect(selectedState.selectedContractId).toBe('1');

    const nonSelectedState = contractsReducer(setupInitialState(), contractsPageActions.selectContract({ contract: null }));

    expect(nonSelectedState.selectedContract).toBeNull();
    expect(nonSelectedState.selectedContractId).toBeUndefined();
  });

  it('should find in loaded items when match id on getContractById', () => {
    const state = contractsReducer(setupInitialState(), contractsPageActions.getContractById({ id: '3'}));

    expect(state.selectedContract).toEqual(setupContract('3'));
    expect(state.selectedContractId).toBe('3');
  });

  it('should set  errorOnLoadContracts to false and isContractLoading to true on loadContracts', () => {
    const currentState = setupInitialState();
    currentState.errorOnLoadContracts = true;
    currentState.isContractLoading = false

    const state = contractsReducer(currentState, contractsPageActions.loadContracts());

    expect(state.errorOnLoadContracts).toBeFalsy();
    expect(state.isContractLoading).toBeTruthy();
  });

  it('should set contracts with list provided and isContractLoading to false on successOnLoadContracts', () => {
    const currentState = setupInitialState();
    currentState.isContractLoading = true

    const state = contractsReducer(currentState, contractsPageActions.successOnLoadContracts({ contracts: [setupContract('123456789')] }));

    expect(state.contracts).toEqual([setupContract('123456789')]);
    expect(state.isContractLoading).toBeFalsy();
  });

  it('should set errorOnLoadContracts to true and isContractLoading to false on errorOnLoadContracts', () => {
    const currentState = setupInitialState();
    currentState.isContractLoading = true
    currentState.errorOnLoadContracts = false

    const state = contractsReducer(currentState, contractsPageActions.errorOnLoadContracts());

    expect(state.isContractLoading).toBeFalsy();
    expect(state.errorOnLoadContracts).toBeTruthy();
  });

  it('should set newContract contract provided, errorOnAddContracts to false and isContractLoading to true on addContract', () => {
    const currentState = setupInitialState();
    currentState.isContractLoading = false
    currentState.errorOnAddContracts = false

    const state = contractsReducer(currentState, contractsPageActions.addContract({ contract: setupContract('12345789') }));

    expect(state.newContract).toEqual(setupContract('12345789'));
    expect(state.isContractLoading).toBeTruthy();
    expect(state.errorOnAddContracts).toBeFalsy();
  });

  it('should set newContract null improve contracts with provided contract and isContractLoading to true on successOnAddContract', () => {
    const currentState = setupInitialState();
    const newContract = setupContract('12345789');
    currentState.isContractLoading = true
    currentState.contracts = []
    currentState.newContract = newContract;

    const state = contractsReducer(currentState, contractsPageActions.successOnAddContract({ contract: newContract }));

    expect(state.newContract).toBeNull();
    expect(state.isContractLoading).toBeFalsy();
    expect(state.errorOnAddContracts).toBeFalsy();
    expect(state.contracts).toHaveLength(1);
    expect(state.contracts.at(0)).toEqual(newContract);
  });

  it('should set errorOnAddContract to true and isContractLoading to false on errorOnAddContract', () => {
    const currentState = setupInitialState();
    const newContract = setupContract('12345789');
    currentState.isContractLoading = true
    currentState.errorOnAddContracts = false
    currentState.newContract = newContract;

    const state = contractsReducer(currentState, contractsPageActions.errorOnAddContract());

    expect(state.newContract).toEqual(newContract);
    expect(state.isContractLoading).toBeFalsy();
    expect(state.errorOnAddContracts).toBeTruthy();
  });

  it('should set errorOnEditContracts to false and isContractLoading to true on editContract', () => {
    const currentState = setupInitialState();
    const editedContract = setupContract('1');
    editedContract.startDate = new Date();

    currentState.isContractLoading = false
    currentState.errorOnEditContracts = true
    currentState.selectedContract = null
    currentState.selectedContractId = undefined

    const state = contractsReducer(currentState, contractsPageActions.editContract({ contract: editedContract }));

    expect(state.isContractLoading).toBeTruthy();
    expect(state.errorOnAddContracts).toBeFalsy();
    expect(state.selectedContract).toEqual(editedContract);
    expect(state.selectedContractId).toBe(editedContract.id);
  });

  it('should set update contracts list with editedContract and isContractLoading to false on successOnEditContract', () => {
    const currentState = setupInitialState();
    const editedContract = setupContract('1');
    editedContract.startDate = new Date();

    currentState.isContractLoading = true;
    currentState.selectedContract = editedContract;
    currentState.selectedContractId = editedContract.id;

    const state = contractsReducer(currentState, contractsPageActions.successOnEditContract({ contract: editedContract }));

    expect(state.isContractLoading).toBeFalsy();
    expect(state.contracts.find(contract => contract.id === '1')).toEqual(editedContract);
  });

  it('should set errorOnEditContracts to true and isContractLoading to false on errorOnEditContract', () => {
    const currentState = setupInitialState();

    currentState.isContractLoading = true;
    currentState.errorOnEditContracts = false;

    const state = contractsReducer(currentState, contractsPageActions.errorOnEditContract());

    expect(state.isContractLoading).toBeFalsy();
    expect(state.errorOnEditContracts).toBeTruthy();
  });

  it('should set errorOnDeleteContracts to false and isContractLoading to true on deleteContract', () => {
    const currentState = setupInitialState();

    currentState.isContractLoading = false;
    currentState.errorOnDeleteContracts = true;

    const state = contractsReducer(currentState, contractsPageActions.deleteContract());

    expect(state.isContractLoading).toBeTruthy();
    expect(state.errorOnDeleteContracts).toBeFalsy();
  });

  it('should set selectedContract to null and isContractLoading to false on successOnDeleteContract', () => {
    const currentState = setupInitialState();

    currentState.isContractLoading = true;
    currentState.selectedContract = currentState.contracts.at(0) as ContractsModel;
    const currentContractSize = currentState.contracts.length
    const state = contractsReducer(currentState, contractsPageActions.successOnDeleteContract());

    expect(state.isContractLoading).toBeFalsy();
    expect(state.selectedContract).toBeNull();
    expect(state.contracts).toHaveLength(currentContractSize - 1);
  });

  it('should set isContractLoading to false on errorOnDeleteContract', () => {
    const currentState = setupInitialState();

    currentState.isContractLoading = true;
    const currentContractSize = currentState.contracts.length
    const state = contractsReducer(currentState, contractsPageActions.errorOnDeleteContract());

    expect(state.isContractLoading).toBeFalsy();
    expect(state.contracts).toHaveLength(currentContractSize);
  });
});

function setupContract(id?: string): ContractsModel {
  return {
    id,
    client: 'MY_CLIENT_ID',
    discount:0,
    suggestedValue: 0,
    startDate: new Date(),
    endDate: new Date(),
    renewable: true,
    price: 1000,
    services: [],
    isActive: true
  }
}

function setupInitialState(): ContractsState {
  return {
    contracts: [setupContract('1'), setupContract('2'), setupContract('3')],
    newContract: null,
    selectedContract: null,
    isContractLoading: false,
    errorOnAddContracts: false,
    errorOnEditContracts: false,
    errorOnDeleteContracts: false,
    errorOnLoadContracts: false
  }
}

