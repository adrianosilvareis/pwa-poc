import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { AppState } from "@root/app/app-state";
import { FormModule } from "@root/app/shared/components/form/form.module";
import { render, screen } from "@testing-library/angular";
import { of } from "rxjs";
import { ContractsModel } from "@pages/contracts/model/contracts.models";
import { ContractsState } from "@pages/contracts/store/contracts.reducer";
import { ContractsFormPage } from "./contracts-form.page";
import { CompanyServicesModel } from "@root/app/pages/company-services/model/company-services.model";
import { CompanyServicesState } from "@root/app/pages/company-services/store/company-services.reducer";
import MockDate from 'mockdate'
import { ClientState } from "@root/app/pages/clients/store/clients.reducer";
import { ClientModel } from "@root/app/pages/clients/model/client.model";

describe('ContractFormPage', () => {
  let initialState: Partial<AppState>

  beforeAll(() => {
    MockDate.set(new Date())
  });

  afterAll(() => {
    MockDate.reset();
  });

  beforeEach(() => {
    initialState = setupInitialStatus();
  })

  it('should provider a correct attributes to app-form', async () => {
    // given
    await setup(initialState, 'MY_ID');

    // when
    const form = screen.getByRole('form');

    // then
    expect(form.getAttribute('ng-reflect-form-id')).toBe('MY_ID');
    expect(form.getAttribute('ng-reflect-title')).toBe('Contract');
  });

  it('should render field provided by data correctly', async () => {
    // given
    const data = setupInitialStatus();
    data.contract.selectedContract = setupContract()

    await setup(data);

    // when
    const nameField = screen.getByLabelText('Data De Inicio');

    // then
    expect(nameField.hasAttribute('required')).toBeTruthy();
    expect(nameField.getAttribute('placeholder')).toBe('Startdate');
  });

  it('should call eddContract when click save and exist id', async () => {
    // given
    const data = setupInitialStatus();
    data.contract.selectedContract = setupContract();

    const { mockStore, mockRouter } = await setup(data, 'MY_ID');
    mockStore.dispatch = jest.fn();
    mockRouter.navigate = jest.fn();

    const action = {
      contract:setupContract(),
      type: "[Contracts Page] Edit Contract"
    }

    // when
    const saveButton = screen.getByRole('save');
    saveButton.click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/contracts']);
  });

  it('should call navigate to /contracts when click on cancel', async () => {
    // given
    const { mockRouter } = await setup({ ...initialState });
    mockRouter.navigate = jest.fn();

    // when
    const cancelButton = screen.getByRole('cancel');
    cancelButton.click();

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/contracts']);
  });
});

function setupContract(): ContractsModel {
  return {
    id: "MY_ID",
    client: 'MY_CLIENT_ID',
    discount:0,
    suggestedValue: 1000,
    startDate: new Date(),
    endDate: new Date(),
    price: 1000,
    renewable: true,
    isActive: true,
    services: [{
      id: 'MY_SERVICE_ID',
      description: 'description',
      isActive: true,
      title: 'title',
      value: 1000
    }]
  }
}

function setupInitialStatus(): {
  contract: ContractsState,
  service: CompanyServicesState,
  client: ClientState,
 } {
  return {
    contract: {
      contracts: [setupContract()],
      newContract: null,
      selectedContract: null,
      isContractLoading: false,
      errorOnAddContracts: false,
      errorOnEditContracts: false,
      errorOnDeleteContracts: false,
      errorOnLoadContracts: false
    },
    service: setupInitialServiceStatus(),
    client: setupInitialClientStatus()
  }
}

function setupService(): CompanyServicesModel {
  return {
    id: 'MY_SERVICE_ID',
    title: 'title',
    description: 'description',
    value: 1000,
    isActive: true,
  }
}

function setupClient(): ClientModel {
  return {
    id: 'MY_CLIENT_ID',
    name: 'name',
    area: 'area',
    owner: 'owner',
    responsible: 'responsible',
    contacts: [],
    contracts: [],
    payments: [],
    description: 'description',
    isActive: true,
  }
}

function setupInitialServiceStatus():CompanyServicesState {
  return {
    services: [setupService()],
    newService: setupService(),
    selectedService: setupService(),
    selectedServiceId: 'MY_ID',
    isServiceLoading: false,
    errorOnAddServices: false,
    errorOnEditServices: false,
    errorOnDeleteServices: false,
    errorOnLoadServices: false
  }
}

function setupInitialClientStatus():ClientState {
  return {
    clients: [setupClient()],
    newClient: null,
    selectedClient: setupClient(),
    selectedClientId: undefined,
    isClientLoading: false,
    errorOnLoadClients: false,
    errorOnAddClients: false,
    errorOnEditClients: false,
    errorOnDeleteClients: false
  }
}

async function setup(initialState: Partial<AppState>, id?:string) {
  const component = await render(ContractsFormPage, {
    imports: [
      FormModule,
      RouterTestingModule.withRoutes([])
    ],
    providers: [
      provideMockStore({ initialState }),
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({ id }),
        },
      },
    ]
  });

  const mockStore = TestBed.inject(MockStore);
  const mockRouter = TestBed.inject(Router);
  return {
    component,
    mockStore,
    mockRouter
  }
}
