import { render, screen } from '@testing-library/angular';
import { ClientsComponent } from './clients.component';
import { provideMockStore } from '@ngrx/store/testing';
import { AppState } from '@pages/clients/store/clients.selectors';
import { SharedModule } from '@root/app/components/shared.module';

describe('ClientsComponent', () => {
  const initialState: AppState = {
    client: {
      clients: [{
        name: 'name',
        description: 'description',
        responsible: 'responsible',
        area: 'area',
        owner: 'owner',
        isActive: true,
      }],
      newClient: null,
      selectedClient: null,
      isClientLoading: false,
      errorOnAddClients: false,
      errorOnEditClients: false,
      errorOnDeleteClients: false,
      errorOnLoadClients: false
    }
  }

  const columnScheme = [
    { name: 'Name', value: 'name' },
    { name: 'Description', value: 'description' },
    { name: 'Responsible', value: 'responsible' },
    { name: 'Area', value: 'area' },
    { name: 'Owner', value: 'owner' },
    { name: 'IsActive', value: 'isActive' },
  ]

  it('should render a table with correct values', async () => {
    // given
    await render(ClientsComponent, {
      imports:[SharedModule],
      componentProperties: {
        columns: columnScheme
      },
      providers: [
        provideMockStore({ initialState })
      ],
    })
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
});
