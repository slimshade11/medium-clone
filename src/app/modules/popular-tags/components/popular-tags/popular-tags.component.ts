import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DestroyComponent } from '@standalone/components/destroy/destroy.component';
import { fromPopularTags } from '@store/popular-tags';
import { getPopularTags } from '@store/popular-tags/popular-tags.actions';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'mc-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent extends DestroyComponent implements OnInit {
  public popularTags$: Observable<Array<string> | null> = this.store.select(fromPopularTags.popularTags);
  public isLoading$: Observable<boolean> = this.store.select(fromPopularTags.isLoading);
  public error$: Observable<string | null> = this.store.select(fromPopularTags.error);

  public selectedPopularTag: string = this.router.url.split('tags/')[1];

  constructor(private store: Store, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData(): void {
    this.popularTags$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (popularTags: Array<string> | null): void => {
        !popularTags && this.store.dispatch(getPopularTags());
      },
    });
  }
}
