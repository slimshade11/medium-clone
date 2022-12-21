import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '@shared/components/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar, private ngZone: NgZone) {}

  showInfoMessage(message: string, status: string, buttonLabel?: string): void {
    this.ngZone.run(() => {
      this.snackBar.openFromComponent(ToastComponent, {
        duration: 4000,
        panelClass: 'toast-custom',
        data: {
          message,
          status,
          buttonLabel,
        },
      });
    });
  }
}
