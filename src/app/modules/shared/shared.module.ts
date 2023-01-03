import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModules } from '@core/angular-material-modules/angular-material-modules';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { ContainerComponent } from '@shared/components/container/container.component';
import { FeedComponent } from '@shared/components/feed/feed.component';
import { FormPanelHeaderComponent } from '@shared/components/form-panel/components/auth-panel-header/form-panel-header.component';
import { FormPanelContentComponent } from '@shared/components/form-panel/components/form-panel-content/form-panel-content.component';
import { FormPanelComponent } from '@shared/components/form-panel/form-panel.component';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { TagListComponent } from '@shared/components/tag-list/tag-list.component';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { TopBarComponent } from '@shared/components/top-bar/top-bar.component';
import { ConfirmationDialogComponent } from '@shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { FavouritesBadgeLabelPipe } from '@shared/pipes/favourites-badge-label.pipe';

const IMPORTS: Array<Type<any>> = [RouterModule, CommonModule];
const COMPONENTS: Array<Type<any>> = [
  TopBarComponent,
  FeedComponent,
  TagListComponent,
  SpinnerComponent,
  BannerComponent,
  ToastComponent,
  FormPanelComponent,
  FormPanelHeaderComponent,
  FormPanelContentComponent,
  BadgeComponent,
  ConfirmationDialogComponent,
  ContainerComponent,
  PaginatorComponent,
];
const PIPES: Array<Type<any>> = [FavouritesBadgeLabelPipe];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [...AngularMaterialModules, ...IMPORTS],
  exports: [...AngularMaterialModules, ...IMPORTS, ...COMPONENTS, ...PIPES],
})
export class SharedModule {}
