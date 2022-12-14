import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserProfileComponent } from '@user-profile/components/user-profile/user-profile.component';
import { UserProfileRoutingModule } from '@user-profile/user-profile-routing.module';
import { UserProfileViewComponent } from '@user-profile/user-profile-view/user-profile-view.component';

const COMPONENTS: Array<any> = [UserProfileViewComponent, UserProfileComponent];
const MODULES: Array<any> = [CommonModule, UserProfileRoutingModule, SharedModule];

@NgModule({
  declarations: COMPONENTS,
  imports: MODULES,
})
export class UserProfileModule {}
