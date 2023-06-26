import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteDialogData } from '@root/app/shared/components/delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {

  private dialogRef!: MatDialogRef<DeleteDialogComponent, boolean>;

  constructor(public dialog: MatDialog) {}

  openDialog(data: DeleteDialogData): void {
    this.dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data,
      enterAnimationDuration: '10ms',
      exitAnimationDuration: '10ms',
    });
  }

  afterClosed() {
    return this.dialogRef.afterClosed();
  }
}
