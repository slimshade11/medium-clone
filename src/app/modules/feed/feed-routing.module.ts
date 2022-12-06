import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedViewComponent } from '@standalone/components/feed-view/feed-view.component';

const routes: Routes = [
  {
    path: '',
    component: FeedViewComponent,
    data: {
      sectionTitle: 'Feed',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeedRoutingModule {}
