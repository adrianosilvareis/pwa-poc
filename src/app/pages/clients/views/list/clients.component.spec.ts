import { render, screen } from '@testing-library/angular';
import { ClientsComponent } from './clients.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@root/app/components/shared.module';
import { ClientModel } from '@pages/clients/model/Clients.model';
import { ColumnItem } from '@root/app/components/table/table.component';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DeleteDialogService } from '@root/app/services/dialog/delete-dialog.service';
import { of } from 'rxjs';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { ClientState, initialState } from '../../store/clients.reducer';
import { AppState } from '@root/app/app-state';

describe('ClientsComponent', () => {

  it('should render header correctly', async () => {
    await setup({ client: initialState });
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(6);
    expect(headers.at(0)?.textContent).toBe('Name');
    expect(headers.at(1)?.textContent).toBe('Description');
    expect(headers.at(2)?.textContent).toBe('Responsible');
    expect(headers.at(3)?.textContent).toBe('Area');
    expect(headers.at(4)?.textContent).toBe('Owner');
    expect(headers.at(5)?.textContent).toBe('IsActive');
  });

  it('should navigate to new client when click on add', async () => {
    // given
    const { mockRouter } = await setup(setupInitialStatus());
    mockRouter.navigate = jest.fn();
    const table = screen.getByRole('client-table');

    // when
    table.dispatchEvent(new Event('add'));

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/clients/new"])
  });

  it('should navigate to edit client when table emit edit event', async () => {
    // given
    const clonedInitialState = { ...initialState, clients: [setupClient()] }
    const { component, mockRouter } = await setup({ client: clonedInitialState });
    mockRouter.navigate = jest.fn();
    const table = screen.getByRole('client-table');

    selectFirstItem().click();
    component.rerender();

    // when
    table.dispatchEvent(new Event('edit'));

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/clients/MY_ID"])
  });

  it('should dispatch select action when click on any row', async () => {
    // given
    const { mockStore } = await setup(setupInitialStatus());
    mockStore.dispatch = jest.fn();

    const actions = {
      client: setupClient(),
      type: "[Clients Page] Select Client"
    }

    // when
    selectFirstItem().click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(actions)
  });

  it('should open delete dialog when remove event is dispatched', async () => {
    // given
    const { mockStore, mockDialog, component } = await setup(setupInitialStatus());
    selectFirstItem().click();
    mockDialog.afterClosed = () => of(false);
    mockDialog.openDialog = jest.fn();

    component.rerender();

    mockStore.dispatch = jest.fn();

    // when
    screen.getByRole('delete-button').click();

    // then
    expect(mockDialog.openDialog).toHaveBeenCalledWith({ pageName: 'Cliente', register: 'name' });
    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should dispatch delete action when confirm delete', async () => {
    // given
    const { mockStore, mockDialog, component } = await setup(setupInitialStatus());
    selectFirstItem().click();
    mockDialog.afterClosed = () => of(true);

    component.rerender();

    mockStore.dispatch = jest.fn();

    const actions = {
      type: "[Clients Page] Delete Client"
    }

    // when
    screen.getByRole('delete-button').click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(actions);
  });
});

function selectFirstItem() {
  const rows = screen.getAllByRole('row');
  const dataRow = rows.at(1) as HTMLElement;
  return dataRow
}

async function setup(initialState: Partial<AppState>) {
  const component = await render(ClientsComponent, {
    imports: [SharedModule],
    componentProperties: {
      columns: setupColumnScheme(),
    },
    providers: [
      provideMockStore({ initialState }),
      DeleteDialogService,
      {
        provide: InteractivityChecker,
        useValue: {
          isFocusable: () => true
        },
      }
    ],
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

function setupClient(): ClientModel {
  return {
    id: 'MY_ID',
    name: 'name',
    description: 'description',
    responsible: 'responsible',
    area: 'area',
    owner: 'owner',
    isActive: true,
  }
}

function setupInitialStatus():{ client: ClientState } {
  return {
    client: {
      clients: [setupClient()],
      newClient: null,
      selectedClient: null,
      isClientLoading: false,
      errorOnAddClients: false,
      errorOnEditClients: false,
      errorOnDeleteClients: false,
      errorOnLoadClients: false
    }
  }
}

function setupColumnScheme(): ColumnItem[] {
  return [
    { name: 'Name', value: 'name' },
    { name: 'Description', value: 'description' },
    { name: 'Responsible', value: 'responsible' },
    { name: 'Area', value: 'area' },
    { name: 'Owner', value: 'owner' },
    { name: 'IsActive', value: 'isActive' },
  ]
}
