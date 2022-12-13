import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedTagComponent } from '@feed/components/feed-tag/feed-tag.component';
import { FeedViewComponent } from '@feed/components/feed-view/feed-view.component';

const routes: Routes = [
  {
    path: '',
    component: FeedViewComponent,
    data: {
      sectionTitle: 'Feed',
    },
  },
  {
    path: 'tags/:slug',
    component: FeedTagComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
