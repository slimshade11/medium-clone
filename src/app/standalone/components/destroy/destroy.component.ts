import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'mc-destroy',
  template: '',
})
export class DestroyComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
