import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getPopularTags } from '@store/popular-tags/popular-tags.actions';
import { error, isLoading, popularTags } from '@store/popular-tags/popular-tags.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent {
  popularTags$: Observable<Array<string> | null> = this.store.select(popularTags);
  isLoading$: Observable<boolean> = this.store.select(isLoading);
  error$: Observable<string | null> = this.store.select(error);

  constructor(private store: Store) {}

  fetchData(): void {
    this.store.dispatch(getPopularTags());
  }
}
