import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModules } from '@core/angular-material-modules/angular-material-modules';
import { TopBarComponent } from '@shared/components/top-bar/top-bar.component';

export const COMPONENTS: Array<Type<any>> = [TopBarComponent];
export const MODULES: Array<Type<any>> = [RouterModule, CommonModule];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES, ...AngularMaterialModules],
  exports: [...AngularMaterialModules, ...COMPONENTS, ...MODULES],
})
export class SharedModule {}
