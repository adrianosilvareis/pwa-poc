import { AppState } from "@root/app/app-state";
import { newContract, isContractLoading, selectedContract, selectedContractId, selectActiveContracts } from "./contracts.selectors";
import { ContractsModel } from "../model/contracts.models";
import { ContractsState } from "./contracts.reducer";
import MockDate from 'mockdate'

describe("Contract Selectors", () => {
  let initialState: Partial<AppState>;

  beforeAll(() => {
    initialState = setupInitialStatus();
    MockDate.set(new Date())
  });

  afterAll(() => {
    MockDate.reset();
  });

  it("should return newContract", () => {
    const result = newContract(initialState);
    expect(result).toEqual(setupContract());
  });

  it("should return isContractLoading", () => {
    const result = isContractLoading(initialState);
    expect(result).toBeFalsy();
  });

  it("should return selectedContract", () => {
    const result = selectedContract(initialState);
    expect(result).toEqual(setupContract());
  });

  it("should return selectedContractId", () => {
    const result = selectedContractId(initialState);
    expect(result).toEqual('MY_ID');
  });

  it("should return selectActiveContracts", () => {
    const result = selectActiveContracts(initialState);
    expect(result).toEqual(initialState.contract?.contracts);
  });
});

function setupContract(id?: string): ContractsModel {
  return {
    id,
    startDate: new Date(),
    endDate: new Date(),
    renewable: true,
    price: 1000,
    services: [],
    isActive: true
  }
}

function setupInitialStatus():{ contract: ContractsState } {
  return {
    contract: {
      contracts: [setupContract()],
      newContract: setupContract(),
      selectedContract: setupContract(),
      selectedContractId: 'MY_ID',
      isContractLoading: false,
      errorOnAddContracts: false,
      errorOnEditContracts: false,
      errorOnDeleteContracts: false,
      errorOnLoadContracts: false
    }
  }
}
