import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mc-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  public label: string = this.data.label;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { label: string },
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}
}
