import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FeedRoutingModule } from '@feed/feed-routing.module';
import { FeedViewComponent } from '@feed/feed-view/feed-view.component';
import { FeedComponent } from '@standalone/components/feed/feed.component';

export const COMPONENTS: Array<Type<unknown>> = [FeedViewComponent];
export const MODULES: Array<Type<unknown>> = [CommonModule, FeedRoutingModule, FeedComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class FeedModule {}
