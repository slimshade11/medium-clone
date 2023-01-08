import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedTagComponent } from '@feed/components/feed-tag/feed-tag.component';
import { FeedTogglerComponent } from '@feed/components/feed-toggler/feed-toggler.component';
import { FeedViewComponent } from '@feed/components/feed-view/feed-view.component';
import { FeedRoutingModule } from '@feed/feed-routing.module';
import { PopularTagsModule } from '@popular-tags/popular-tags.module';
import { SharedModule } from '@shared/shared.module';

export const COMPONENTS: Array<any> = [FeedViewComponent, FeedTogglerComponent, FeedTagComponent];
export const MODULES: Array<any> = [CommonModule, FeedRoutingModule, SharedModule, PopularTagsModule];

@NgModule({
  declarations: COMPONENTS,
  imports: [...MODULES],
})
export class FeedModule {}
