import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FeedTogglerComponent } from '@feed/components/feed-toggler/feed-toggler.component';
import { FeedViewComponent } from '@feed/components/feed-view/feed-view.component';
import { FeedRoutingModule } from '@feed/feed-routing.module';
import { PopularTagsModule } from '@popular-tags/popular-tags.module';
import { SharedModule } from '@shared/shared.module';
import { PaginatorComponent } from '@standalone/components/paginator/paginator.component';
import { FeedTagComponent } from './components/feed-tag/feed-tag.component';

export const COMPONENTS: Array<Type<unknown>> = [FeedViewComponent, FeedTogglerComponent];
export const MODULES: Array<Type<unknown>> = [CommonModule, FeedRoutingModule, SharedModule, PopularTagsModule];
export const STANDALONE: Array<Type<unknown>> = [PaginatorComponent];
@NgModule({
  declarations: [...COMPONENTS, FeedTagComponent],
  imports: [...MODULES, ...STANDALONE],
})
export class FeedModule {}
