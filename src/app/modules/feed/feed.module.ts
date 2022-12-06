import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FeedViewComponent } from '@feed/components/feed-view/feed-view.component';
import { FeedRoutingModule } from '@feed/feed-routing.module';
import { FeedComponent } from '@standalone/components/feed/feed.component';

export const COMPONENTS: Array<Type<unknown>> = [FeedViewComponent];
export const MODULES: Array<Type<unknown>> = [CommonModule, FeedRoutingModule];
export const STANDALONE: Array<Type<unknown>> = [FeedComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, ...STANDALONE],
})
export class FeedModule {}
