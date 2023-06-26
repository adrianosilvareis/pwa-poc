import { render, screen } from "@testing-library/angular";
import { initialState } from "@pages/contracts/store/contracts.reducer";
import { InteractivityChecker } from "@angular/cdk/a11y";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { AppState } from "@root/app/app-state";
import { SharedModule } from "@root/app/shared/shared.module";
import { DeleteDialogService } from "@root/app/services/dialog/delete-dialog.service";
import { of } from "rxjs";
import { ContractsComponent } from "./contracts.component";
import { ContractsModel } from "@pages/contracts/model/contracts.models";
import MockDate from 'mockdate'

describe('ContractComponent', () => {

  beforeAll(() => {
    MockDate.set(new Date())
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should render header correctly', async () => {
    await setup({ contract: initialState });
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(5);
    expect(headers.at(0)?.textContent).toBe('Start Date');
    expect(headers.at(1)?.textContent).toBe('End Date');
    expect(headers.at(2)?.textContent).toBe('Renewable');
    expect(headers.at(3)?.textContent).toBe('Services');
    expect(headers.at(4)?.textContent).toBe('Price');
  });

  it('should navigate to new contract when table emit add event', async () => {
    // given
    const { mockRouter } = await setup({ contract: initialState });
    mockRouter.navigate = jest.fn();
    const table = screen.getByRole('company-table');

    // when
    table.dispatchEvent(new Event('add'));

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/contracts/new"]);
  });

  it('should navigate to edit contract when table emit edit event', async () => {
    // given
    const clonedInitialState = { ...initialState, contracts:[setupContract('my_id')] };
    const { mockRouter, component } = await setup({ contract: clonedInitialState });
    mockRouter.navigate = jest.fn();
    const table = screen.getByRole('company-table');

    // when
    selectFirstItem().click()
    component.rerender();

    table.dispatchEvent(new Event('edit'));

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/contracts/my_id"]);
  });

  it('should dispatch Select Contract Action when select event is dispatched', async () => {
    // given
    const clonedInitialState = { ...initialState, contracts:[setupContract('my_id')] };
    const { mockStore } = await setup({ contract: clonedInitialState });
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
    const clonedInitialState = { ...initialState, contracts:[setupContract('my_id')] };
    const { mockStore, mockDialog, component } = await setup({ contract: clonedInitialState });
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
    const clonedInitialState = { ...initialState, contracts:[setupContract('my_id')] };
    const { mockStore, mockDialog, component } = await setup({ contract: clonedInitialState });
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

function selectFirstItem() {
  const rows = screen.getAllByRole('row');
  const dataRow = rows.at(1) as HTMLElement;
  return dataRow
}

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

async function setup(initialState: Partial<AppState>) {
  const component = await render(ContractsComponent, {
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
