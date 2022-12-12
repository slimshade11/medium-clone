import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUser } from '@store/auth/auth.actions';

@Component({
  selector: 'mc-root',
  template: `
    <div class="max-w-screen-xl mx-auto px-3 xl:px-0">
      <div class="menu">
        <mc-top-bar></mc-top-bar>
      </div>
      <div class="content overflow-x-hidden">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(getCurrentUser());
  }
}
