import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";
import { AppState } from "@root/app/app-state";
import { SharedModule } from "@root/app/components/shared.module";
import { fireEvent, render, screen } from "@testing-library/angular";
import { of } from "rxjs";
import { CompanyServicesState } from "../../store/company-services.reducer";
import { CompanyServiceFormComponent } from "./company-service-form.component";
import { CompanyServicesModel } from "../../model/company-services.model";

describe('ServiceFormComponent', () => {
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
    expect(form.getAttribute('ng-reflect-title')).toBe('Service');
  });

  it('should render field provided by data correctly', async () => {
    // given
    const data = setupInitialStatus();
    data.service.selectedService = setupService()

    await setup(data);

    // when
    const nameField = screen.getByLabelText('Title');

    // then
    expect(nameField.hasAttribute('required')).toBeTruthy();
    expect(nameField.getAttribute('placeholder')).toBe('Title');
  });

  it('should call edit action when click save and exist id', async () => {
    // given
    const data = setupInitialStatus();
    data.service.selectedService = setupService();

    const { mockStore, mockRouter } = await setup(data, 'MY_ID');
    mockStore.dispatch = jest.fn();
    mockRouter.navigate = jest.fn();

    const action = {
      service:setupService(),
      type: "[Services Page] Edit Service"
    }

    // when
    const saveButton = screen.getByRole('save');
    saveButton.click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/services']);
  });

  it('should call save action when click save and exist id', async () => {
    // given
    const { mockStore, mockRouter } = await setup(initialState);
    mockStore.dispatch = jest.fn();
    mockRouter.navigate = jest.fn();

    const action = {
      service: {
        id: "MY_ID",
        title: 'MY_VALUE',
        description: 'description',
        value: 1000,
        isActive: true
      },
      type: "[Services Page] Add Service"
    }

    // when
    const input = screen.getByLabelText('Title');
    fireEvent.input(input, {target: { value: 'MY_VALUE' }});

    const saveButton = screen.getByRole('save');
    saveButton.click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/services']);
  });

  it('should call navigate to /services when click on cancel', async () => {
    // given
    const { mockRouter } = await setup({ ...initialState });
    mockRouter.navigate = jest.fn();

    // when
    const cancelButton = screen.getByRole('cancel');
    cancelButton.click();

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/services']);
  });
});

function setupService(): CompanyServicesModel {
  return {
    id: "MY_ID",
    title: 'title',
    description: 'description',
    value: 1000,
    isActive: true
  }
}

function setupInitialStatus(): { service: CompanyServicesState } {
  return {
    service: {
      services: [setupService()],
      newService: null,
      selectedService: setupService(),
      selectedServiceId: undefined,
      isServiceLoading: false,
      errorOnLoadServices: false,
      errorOnAddServices: false,
      errorOnEditServices: false,
      errorOnDeleteServices: false,
    }
  }
}

async function setup(initialState: Partial<AppState>, id?:string) {
  const component = await render(CompanyServiceFormComponent, {
    imports: [
      SharedModule,
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
