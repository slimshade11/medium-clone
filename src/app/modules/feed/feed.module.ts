import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FeedRoutingModule } from '@feed/feed-routing.module';
import { FeedViewComponent } from '@standalone/components/feed-view/feed-view.component';

export const COMPONENTS: Array<Type<unknown>> = [];
export const MODULES: Array<Type<unknown>> = [CommonModule, FeedRoutingModule, FeedViewComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
})
export class FeedModule {}
