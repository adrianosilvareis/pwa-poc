import { render, screen } from "@testing-library/angular";
import { initialState as contractInitialState } from "@pages/contracts/store/contracts.reducer";
import { initialState as clientInitialState } from "@pages/clients/store/clients.reducer";
import { InteractivityChecker } from "@angular/cdk/a11y";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { AppState } from "@root/app/app-state";
import { SharedModule } from "@root/app/shared/shared.module";
import { DeleteDialogService } from "@root/app/services/dialog/delete-dialog.service";
import { of } from "rxjs";
import { ContractsPage } from "./contracts.page";
import { ContractsModel } from "@pages/contracts/model/contracts.models";
import MockDate from 'mockdate'
import { ClientModel } from "@root/app/pages/clients/model/client.model";

describe('ContractPage', () => {

  beforeAll(() => {
    MockDate.set(new Date())
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should render header correctly', async () => {
    await setup({ contract: contractInitialState });
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(5);
    expect(headers.at(0)?.textContent).toBe('Cliente');
    expect(headers.at(1)?.textContent).toBe('Data Inicio');
    expect(headers.at(2)?.textContent).toBe('Data Fim');
    expect(headers.at(3)?.textContent).toBe('Renovável');
    expect(headers.at(4)?.textContent).toBe('Preço');
  });

  it('should navigate to new contract when table emit add event', async () => {
    // given
    const { mockRouter } = await setup({ contract: contractInitialState });
    mockRouter.navigate = jest.fn();
    const table = screen.getByRole('company-table');

    // when
    table.dispatchEvent(new Event('add'));

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/contracts/new"]);
  });

  it('should navigate to edit contract when table emit edit event', async () => {
    // given
    const { mockRouter, component } = await setup(mockInitialState());
    mockRouter.navigate = jest.fn();
    const table = screen.getByRole('company-table');

    //when
    selectFirstItem().click()
    component.rerender();

    table.dispatchEvent(new Event('edit'));

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/contracts/my_id"]);
  });

  it('should dispatch Select Contract Action when select event is dispatched', async () => {
    // given
    const { mockStore } = await setup(mockInitialState());
    mockStore.dispatch = jest.fn();

    const actions =  {
      contract: setupContract('my_id'),
      type: "[Contracts Page] Select Contract"
    }

    // when
    selectFirstItem().click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(actions);
  });

  it('should open DeleteDialog when remove event is dispatched', async () => {
    // given
    const { mockStore, mockDialog, component } = await setup(mockInitialState());
    mockDialog.openDialog = jest.fn();
    mockDialog.afterClosed = () => of(false);

    // when
    selectFirstItem().click();
    component.rerender();

    mockStore.dispatch = jest.fn();

    screen.getByRole('delete-button').click();

    // then
    expect(mockDialog.openDialog).toHaveBeenCalledWith({ pageName: 'Serviço', register: 'my_id' });
    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should dispatch remove action when dialog is closed with OK', async () => {
    // given
    const { mockStore, mockDialog, component } = await setup(mockInitialState());
    selectFirstItem().click();
    component.rerender();
    mockDialog.afterClosed = () => of(true);
    mockStore.dispatch = jest.fn();

    // when
    screen.getByRole('delete-button').click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: '[Contracts Page] Delete Contract' });
  });

});

function mockInitialState() {
  const clonedContractInitialState = { ...contractInitialState, contracts: [setupContract('my_id')] };
  const clonedClientInitialState = { ...clientInitialState, clients: [setupClient()] };
  return { contract: clonedContractInitialState, client: clonedClientInitialState };
}

function selectFirstItem() {
  const rows = screen.getAllByRole('row');
  const dataRow = rows.at(1) as HTMLElement;
  return dataRow
}

function setupContract(id?: string): ContractsModel & {clientName: string} {
  return {
    id,
    client: 'MY_CLIENT_ID',
    discount:0,
    suggestedValue: 1000,
    startDate: new Date(),
    endDate: new Date(),
    renewable: true,
    price: 1000,
    services: [],
    isActive: true,
    clientName: 'MY_CLIENT_NAME'
  }
}
function setupClient(): ClientModel {
  return {
    id: 'MY_CLIENT_ID',
    name: 'MY_CLIENT_NAME',
    area: 'MY_CLIENT_AREA',
    description: 'MY_CLIENT_DESCRIPTION',
    owner: 'MY_CLIENT_OWNER',
    responsible: 'MY_CLIENT_RESPONSIBLE',
    contacts: [],
    contracts: [],
    payments: [],
    isActive: true
  }
}

async function setup(initialState: Partial<AppState>) {
  const component = await render(ContractsPage, {
    imports: [SharedModule],
    providers: [
      provideMockStore({ initialState }),
      DeleteDialogService,
      {
        provide: InteractivityChecker,
        useValue: {
          isFocusable: () => true
        },
      }
    ]
  });

  const mockStore = TestBed.inject(MockStore);
  const mockRouter = TestBed.inject(Router);
  const mockDialog = TestBed.inject(DeleteDialogService);

  return {
    component,
    mockStore,
    mockRouter,
    mockDialog
  }
}
