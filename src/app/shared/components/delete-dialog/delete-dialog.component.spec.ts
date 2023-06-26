import { DeleteDialogComponent, DeleteDialogData } from './delete-dialog.component';
import { MaterialModule } from '@root/app/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { render, screen } from '@testing-library/angular';

describe('DeleteDialogComponent', () => {
  it('should render page name and message correctly', async () => {
    const { title, message } = await setup({ pageName: 'My_Page', register: 'My_register' });

    expect(title.textContent).toBe('Delete My_Page');
    expect(message.textContent).toBe('Deseja deletar o registro "My_register"?');
  });

  it('should call close with falsy valeu when click on "No" button', async () => {
    const { matDialogRefMock, cancel } = await setup({ pageName: 'My_Page', register: 'My_register' });

    matDialogRefMock.close = jest.fn();

    cancel.click();

    expect(matDialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('should call close with tru valeu when click on "Yes" button', async () => {
    const { matDialogRefMock, confirm } = await setup({ pageName: 'My_Page', register: 'My_register' });

    matDialogRefMock.close = jest.fn();

    confirm.click();

    expect(matDialogRefMock.close).toHaveBeenCalledWith(true);
  });
});

async function setup(data: DeleteDialogData) {
  class MatDialogRefMock {
    close(value = '') {
      return value;
    }
  }
  const matDialogRefMock = new MatDialogRefMock();

  const component = await render(DeleteDialogComponent, {
    imports: [MaterialModule],
    providers: [
      {
        provide: MatDialogRef,
        useValue: matDialogRefMock
      },
      {
        provide: MAT_DIALOG_DATA,
        useValue: data
      }
    ]
  });

  const title = screen.getByTestId('title');
  const message = screen.getByTestId('message');
  const cancel = screen.getByTestId('cancel');
  const confirm = screen.getByTestId('confirm');

  return {
    component,
    title,
    message,
    cancel,
    confirm,
    matDialogRefMock
  }
}

