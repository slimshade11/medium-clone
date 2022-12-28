import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUser } from '@app/modules/auth/models/user.model';
import { Store } from '@ngrx/store';
import { ConfirmationDialogComponent } from '@shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { AuthActions, fromAuth } from '@store/auth';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'mc-top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent extends DestroyComponent {
  isLoggedIn$: Observable<boolean | null> = this.store.select(fromAuth.isLoggedIn);
  isAnonymous$: Observable<boolean> = this.store.select(fromAuth.isAnonymous);
  currentUser$: Observable<CurrentUser | null> = this.store.select(fromAuth.currentUser);

  constructor(private store: Store, private dialog: MatDialog) {
    super();
  }

  public onLogout(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        label: 'Are you sure to logout?"',
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (confirmation: boolean): void => {
          confirmation && this.store.dispatch(AuthActions.logout());
        },
      });
  }
}
