import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModules } from '@core/angular-material-modules/angular-material-modules';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { FeedComponent } from '@shared/components/feed/feed.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { TagListComponent } from '@shared/components/tag-list/tag-list.component';
import { TopBarComponent } from '@shared/components/top-bar/top-bar.component';
import { PaginatorComponent } from '@standalone/components/paginator/paginator.component';

export const COMPONENTS: Array<Type<any>> = [
  TopBarComponent,
  FeedComponent,
  TagListComponent,
  SpinnerComponent,
  BannerComponent,
];
export const IMPORTS: Array<Type<any>> = [RouterModule, CommonModule];
export const STANDALONE: Array<Type<any>> = [PaginatorComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...AngularMaterialModules, ...IMPORTS, ...STANDALONE],
  exports: [...AngularMaterialModules, ...IMPORTS, ...STANDALONE, ...COMPONENTS],
})
export class SharedModule {}
