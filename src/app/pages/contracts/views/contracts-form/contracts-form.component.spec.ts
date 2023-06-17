import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { AppState } from "@root/app/app-state";
import { FormModule } from "@root/app/components/form/form.module";
import { fireEvent, render, screen } from "@testing-library/angular";
import { of } from "rxjs";
import { ContractsModel } from "../../model/contracts.models";
import { ContractsState } from "../../store/contracts.reducer";
import { ContractsFormComponent } from "./contracts-form.component";
import { CompanyServicesModel } from "@root/app/pages/company-services/model/company-services.model";
import { CompanyServicesState } from "@root/app/pages/company-services/store/company-services.reducer";
import MockDate from 'mockdate'

describe('ContractFormComponent', () => {
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
    const nameField = screen.getByLabelText('Startdate');

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
    startDate: new Date(),
    endDate: new Date(),
    price: 1000,
    renewable: true,
    isActive: true,
    services: []
  }
}

function setupInitialStatus(): {
  contract: ContractsState,
  service: CompanyServicesState
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
    service: setupInitialServiceStatus()
  }
}

function setupService(): CompanyServicesModel {
  return {
    id: 'MY_ID',
    title: 'title',
    description: 'description',
    value: 1000,
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

async function setup(initialState: Partial<AppState>, id?:string) {
  const component = await render(ContractsFormComponent, {
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
