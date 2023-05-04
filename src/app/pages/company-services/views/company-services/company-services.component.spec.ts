import { initialState } from '@pages/company-services/store/company-services.reducer';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { CompanyServicesComponent } from './company-services.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DeleteDialogService } from '@root/app/services/dialog/delete-dialog.service';
import { render, screen } from '@testing-library/angular';
import { SharedModule } from '@root/app/components/shared.module';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { AppState } from '@root/app/app-state';
import { of } from 'rxjs';

describe('CompanyServicesComponent', () => {

  it('should render header correctly', async () => {
    await setup({ service: initialState });
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(3);
    expect(headers.at(0)?.textContent).toBe('Title');
    expect(headers.at(1)?.textContent).toBe('Description');
    expect(headers.at(2)?.textContent).toBe('Value');
  });

  it('should navigate to new service when table emit add event', async () => {
    // given
    const { mockRouter } = await setup({ service: initialState });
    mockRouter.navigate = jest.fn();
    const table = screen.getByRole('company-table');

    // when
    table.dispatchEvent(new Event('add'));

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/services/new"]);
  });

  it('should navigate to edit service when table emit edit event', async () => {
    // given
    const clonedInitialState = { ...initialState, services:[setupService('my_id')] };
    const { mockRouter, component } = await setup({ service: clonedInitialState });
    mockRouter.navigate = jest.fn();
    const table = screen.getByRole('company-table');

    // when
    selectFirstItem().click()
    component.rerender();

    table.dispatchEvent(new Event('edit'));

    // then
    expect(mockRouter.navigate).toHaveBeenCalledWith(["/services/my_id"]);
  });

  it('should dispatch Select Service Action when select event is dispatched', async () => {
    // given
    const clonedInitialState = { ...initialState, services:[setupService('my_id')] };
    const { mockStore } = await setup({ service: clonedInitialState });
    mockStore.dispatch = jest.fn();

    const actions =  {
      service: setupService('my_id'),
      type: "[Services Page] Select Service"
    }

    // when
    selectFirstItem().click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith(actions);
  });

  it('should open DeleteDialog when remove event is dispatched', async () => {
    // given
    const clonedInitialState = { ...initialState, services:[setupService('my_id')] };
    const { mockStore, mockDialog, component } = await setup({ service: clonedInitialState });
    mockDialog.openDialog = jest.fn();
    mockDialog.afterClosed = () => of(false);

    // when
    selectFirstItem().click();
    component.rerender();

    mockStore.dispatch = jest.fn();

    screen.getByRole('delete-button').click();

    // then
    expect(mockDialog.openDialog).toHaveBeenCalledWith({ pageName: 'Serviço', register: 'title' });
    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should dispatch remove action when dialog is closed with OK', async () => {
    // given
    const clonedInitialState = { ...initialState, services:[setupService('my_id')] };
    const { mockStore, mockDialog, component } = await setup({ service: clonedInitialState });
    selectFirstItem().click();
    component.rerender();
    mockDialog.afterClosed = () => of(true);
    mockStore.dispatch = jest.fn();

    // when
    screen.getByRole('delete-button').click();

    // then
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: '[Services Page] Delete Service' });
  });

});

function selectFirstItem() {
  const rows = screen.getAllByRole('row');
  const dataRow = rows.at(1) as HTMLElement;
  return dataRow
}

function setupService(id?: string) {
  return {
    id,
    value: 1000,
    title: 'title',
    description: 'description',
    isActive: true
  }
}

async function setup(initialState: Partial<AppState>) {
  const component = await render(CompanyServicesComponent, {
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
