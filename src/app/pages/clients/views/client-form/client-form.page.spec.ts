import { ClientModel } from '@pages/clients/model/client.model';
import { ClientFormPage } from './client-form.page';
import { fireEvent, render, screen } from '@testing-library/angular';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientState } from '@pages/clients/store/clients.reducer';
import { AppState } from '@root/app/app-state';
import { FormModule } from '@root/app/shared/components/form/form.module';

describe('ClientFormPage', () => {
  let initialState: Partial<AppState>

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
    expect(form.getAttribute('ng-reflect-title')).toBe('Client');
  });

  it('should render field provided by data correctly', async () => {
    // given
    const data = setupInitialStatus();
    data.client.selectedClient = setupClient()

    await setup(data);

    // when
    const nameField = screen.getByLabelText('Name');

    // then
    expect(nameField.hasAttribute('required')).toBeTruthy();
    expect(nameField.getAttribute('placeholder')).toBe('Name');
  });

  it('should call eddClient when click save and exist id', async () => {
    // given
    const data = setupInitialStatus();
    data.client.selectedClient = setupClient();

    const { mockStore, mockRouter } = await setup(data, 'MY_ID');
    mockStore.dispatch = jest.fn();
    mockRouter.navigate = jest.fn();

    const action = {
      client:setupClient(),
      type: "[Clients Page] Edit Client"
    }

    // when
    const saveButton = screen.getByRole('save');
    saveButton.click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/clients']);
  });

  it('should call addClient when click save and exist id', async () => {
    // given
    const { mockStore, mockRouter } = await setup(initialState);
    mockStore.dispatch = jest.fn();
    mockRouter.navigate = jest.fn();

    const action = {
      client: {
        id: undefined,
        name: 'MY_VALUE',
        area: null,
        contacts: [],
        contracts: [],
        payments: [],
        description: null,
        isActive: false,
        owner: null,
        responsible: null,
      },
      type: "[Clients Page] Add Client"
    }

    // when
    const input = screen.getByLabelText('Name');
    fireEvent.input(input, {target: { value: 'MY_VALUE' }});

    const saveButton = screen.getByRole('save');
    saveButton.click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/clients']);
  });

  it('should call navigate to /clients when click on cancel', async () => {
    // given
    const { mockRouter } = await setup({ ...initialState });
    mockRouter.navigate = jest.fn();

    // when
    const cancelButton = screen.getByRole('cancel');
    cancelButton.click();

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/clients']);
  });
});

function setupClient(): ClientModel {
  return {
    id: "MY_ID",
    name: 'name',
    description: 'description',
    responsible: 'responsible',
    area: 'area',
    owner: 'owner',
    isActive: true,
    contacts: [],
    contracts: [],
    payments: []
  }
}

function setupInitialStatus(): { client: ClientState } {
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

async function setup(initialState: Partial<AppState>, id?:string) {
  const component = await render(ClientFormPage, {
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
