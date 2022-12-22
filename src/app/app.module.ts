import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, isDevMode, Type } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { ArticleFacade } from '@article/article.facade';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@shared/shared.module';
import { ArticleEditEffects } from '@store/article-edit/article-edit.effects';
import { ArticleEffects } from '@store/article/article.effects';
import { AuthEffects } from '@store/auth/auth.effects';
import { AddToFavouritesEffects } from '@store/favourites/favourites.effects';
import { FeedEffects } from '@store/feed/feed.effects';
import { PopularTagsEffects } from '@store/popular-tags/popular-tags.effects';
import { ROOT_REDUCERS } from '@store/root-reducer';
import { UserProfileEffects } from '@store/user-profile/user-profile.effects';

const COMPONENTS: Array<Type<unknown>> = [AppComponent];

const MODULES: Array<any> = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  SharedModule,

  //NgRx modules
  EffectsModule.forRoot([
    AuthEffects,
    FeedEffects,
    PopularTagsEffects,
    ArticleEffects,
    ArticleEditEffects,
    AddToFavouritesEffects,
    UserProfileEffects,
  ]),
  StoreModule.forRoot(ROOT_REDUCERS),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
  }),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  StoreRouterConnectingModule.forRoot(),
];
const INTERCEPTORS: Array<any> = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];
const SERVICES: Array<Type<unknown>> = [FormBuilder, ArticleFacade];
@NgModule({
  declarations: COMPONENTS,
  imports: [...MODULES],
  providers: [...INTERCEPTORS, ...SERVICES],
  bootstrap: [AppComponent],
})
export class AppModule {}
