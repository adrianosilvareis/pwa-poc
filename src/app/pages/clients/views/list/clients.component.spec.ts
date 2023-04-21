import { fireEvent, render, screen } from '@testing-library/angular';
import { ClientsComponent } from './clients.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from '@pages/clients/store/clients.selectors';
import { SharedModule } from '@root/app/components/shared.module';
import { ClientModel } from '@pages/clients/model/Clients.model';
import { ColumnItem } from '@root/app/components/table/table.component';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

describe('ClientsComponent', () => {

  it('should render a table with correct values', async () => {
    // given
    await setup(setupInitialStatus());
    // when
    const cells = screen.getAllByRole('cell');
    const headers = screen.getAllByRole('columnheader');

    // then
    //cells
    expect(cells.at(0)?.textContent).toBe('name');
    expect(cells.at(1)?.textContent).toBe('description');

    //headers
    expect(headers.at(0)?.textContent).toBe('Name')
    expect(headers.at(1)?.textContent).toBe('Description')
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
    const [ row ] = screen.getAllByRole('cell');
    row.click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(actions)
  });

  it('should dispatch delete action when click on any row', async () => {
    // given
    const { mockStore, component } = await setup(setupInitialStatus());
    const [ row ] = screen.getAllByRole('cell');
    row.click();

    component.rerender();

    mockStore.dispatch = jest.fn();

    const actions = {
      type: "[Clients Page] Delete Client"
    }

    // when
    const deleteButton = screen.getByText('delete')
    deleteButton.click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(actions);
  });

  it('should navigate to new client when click on add', async () => {
    // given
    const { mockRouter } = await setup(setupInitialStatus());
    mockRouter.navigate = jest.fn();

    // when
    const addButton = screen.getByText('add_circle');
    addButton.click();

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/clients/new"])
  });

  it('should navigate to edit client when click on edit', async () => {
    // given
    const { component, mockRouter } = await setup(setupInitialStatus());
    mockRouter.navigate = jest.fn();

    const [ row ] = screen.getAllByRole('cell');
    row.click();

    component.rerender();

    // when
    const editButton = screen.getByText('edit');
    editButton.click();

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/clients/MY_ID"])
  });
});

async function setup(initialState: AppState) {
  const component = await render(ClientsComponent, {
    imports: [SharedModule],
    componentProperties: {
      columns: setupColumnScheme(),
    },
    providers: [
      provideMockStore({ initialState })
    ],
  });

  const mockStore = TestBed.inject(MockStore);
  const mockRouter = TestBed.inject(Router);

  return {
    component,
    mockStore,
    mockRouter
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

function setupInitialStatus():AppState {
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
