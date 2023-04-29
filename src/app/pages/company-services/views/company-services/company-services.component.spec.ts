import { initialState } from './../../store/company-services.reducer';
import { InteractivityChecker } from '@angular/cdk/a11y';
import { CompanyServicesComponent } from './company-services.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DeleteDialogService } from '@root/app/services/dialog/delete-dialog.service';
import { render, screen } from '@testing-library/angular';
import { SharedModule } from '@root/app/components/shared.module';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { AppState } from '@root/app/app-state';

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
    const { mockRouter } = await setup({ service: initialState });
    mockRouter.navigate = jest.fn();

    const table = screen.getByRole('company-table');
    table.dispatchEvent(new Event('add'));

    expect(mockRouter.navigate).toHaveBeenCalledWith(["/services/new"]);
  });
});

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
