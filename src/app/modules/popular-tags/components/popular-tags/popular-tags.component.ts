import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { getPopularTags } from '@store/popular-tags/popular-tags.actions';
import { error, isLoading, popularTags } from '@store/popular-tags/popular-tags.selectors';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent extends DestroyComponent implements OnInit {
  public popularTags$: Observable<Array<string> | null> = this.store.select(popularTags);
  public isLoading$: Observable<boolean> = this.store.select(isLoading);
  public error$: Observable<string | null> = this.store.select(error);

  public selectedPopularTag: string = this.router.url.split('tags/')[1];

  constructor(private store: Store, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.popularTags$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (popularTags: Array<string> | null): void => {
        !popularTags && this.store.dispatch(getPopularTags());
      },
    });
  }
}
