import { TestBed } from '@angular/core/testing';

import { DeleteDialogService } from './delete-dialog.service';
import { MaterialModule } from '@root/app/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@root/app/components/delete-dialog/delete-dialog.component';

describe('DeleteDialogService', () => {
  let service: DeleteDialogService;
  let mockDialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ]
    });
    mockDialog = TestBed.inject(MatDialog);
    service = TestBed.inject(DeleteDialogService);
  });

  it('should be called with correct params', () => {
    // given
    mockDialog.open = jest.fn();

    // when
    service.openDialog({ pageName: 'My_page', register: 'My_register' });

    // then
    expect(mockDialog.open).toHaveBeenCalledWith(DeleteDialogComponent,
      {
        data: {pageName: "My_page", register: "My_register"},
        enterAnimationDuration: "10ms",
        exitAnimationDuration: "10ms",
        width: "250px"
      })
  });
});
