import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FeedViewComponent } from '@feed/components/feed-view/feed-view.component';
import { FeedRoutingModule } from '@feed/feed-routing.module';
import { PopularTagsModule } from '@popular-tags/popular-tags.module';
import { SharedModule } from '@shared/shared.module';
import { PaginatorComponent } from '@standalone/components/paginator/paginator.component';

export const COMPONENTS: Array<Type<unknown>> = [FeedViewComponent];
export const MODULES: Array<Type<unknown>> = [CommonModule, FeedRoutingModule, SharedModule, PopularTagsModule];
export const STANDALONE: Array<Type<unknown>> = [PaginatorComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, ...STANDALONE],
})
export class FeedModule {}
