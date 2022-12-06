import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, isDevMode, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '@shared/shared.module';
import { AuthEffects } from '@store/auth/auth.effects';
import { FeedEffects } from '@store/feed/feed.effects';
import { ROOT_REDUCERS } from '@store/root-reducer';

const COMPONENTS: Array<Type<unknown>> = [AppComponent];

const MODULES: Array<any> = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  HttpClientModule,
  StoreModule.forRoot(ROOT_REDUCERS),
  StoreDevtoolsModule.instrument({
    maxAge: 25,
    logOnly: !isDevMode(),
    autoPause: true,
  }),
  StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  EffectsModule.forRoot([AuthEffects, FeedEffects]),
  SharedModule,
];
const INTERCEPTORS: Array<any> = [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }];

@NgModule({
  declarations: COMPONENTS,
  imports: [...MODULES],
  providers: [...INTERCEPTORS],
  bootstrap: [AppComponent],
})
export class AppModule {}
