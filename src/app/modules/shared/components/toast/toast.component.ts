import { Component, inject, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ToastStatus } from '@core/enums/toast-status.enum';
import { ToastConfig } from '@core/models/toast-config.model';

@Component({
  selector: 'mc-toast',
  template: `
    <div
      [ngClass]="{
        'bg-green-500': toastConfig.status === toastStatus.SUCCESS,
        'bg-red-500': toastConfig.status === toastStatus.WARN,
        'bg-blue-500': toastConfig.status === toastStatus.INFO
      }"
      class="custom-toast flex justify-between items-center p-4 rounded-sm">
      <div class="text-lg font-semibold mr-7">{{ toastConfig.message }}</div>
      <button
        *ngIf="toastConfig.buttonLabel"
        (click)="snackBarRef.dismissWithAction()"
        mat-raised-button>
        {{ toastConfig.buttonLabel }}
      </button>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  public snackBarRef = inject(MatSnackBarRef);
  public toastStatus = ToastStatus;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public toastConfig: ToastConfig) {}
}
