import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModules } from '@core/angular-material-modules/angular-material-modules';
import { BannerComponent } from '@shared/components/banner/banner.component';
import { FeedComponent } from '@shared/components/feed/feed.component';
import { FormPanelHeaderComponent } from '@shared/components/form-panel/components/auth-panel-header/form-panel-header.component';
import { formPanelContentComponent } from '@shared/components/form-panel/components/form-panel-content/form-panel-content.component';
import { FormPanelComponent } from '@shared/components/form-panel/form-panel.component';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { TagListComponent } from '@shared/components/tag-list/tag-list.component';
import { ToastComponent } from '@shared/components/toast/toast.component';
import { TopBarComponent } from '@shared/components/top-bar/top-bar.component';
import { PaginatorComponent } from '@standalone/components/paginator/paginator.component';

export const COMPONENTS: Array<Type<any>> = [
  TopBarComponent,
  FeedComponent,
  TagListComponent,
  SpinnerComponent,
  BannerComponent,
  ToastComponent,
  FormPanelComponent,
  FormPanelHeaderComponent,
  formPanelContentComponent,
];
export const IMPORTS: Array<Type<any>> = [RouterModule, CommonModule];
export const STANDALONE: Array<Type<any>> = [PaginatorComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...AngularMaterialModules, ...IMPORTS, ...STANDALONE],
  exports: [...AngularMaterialModules, ...IMPORTS, ...STANDALONE, ...COMPONENTS],
})
export class SharedModule {}
