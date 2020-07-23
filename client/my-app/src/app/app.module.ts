import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
// Animation
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Service
import { CookieService } from "ngx-cookie-service";
// Routing
import { AppRoutingModule } from './app-routing.module';
// Interceptor
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './core/guards/http-config.interceptor';
// CDK
import { OverlayModule } from '@angular/cdk/overlay';
// Module
import { SharedModule } from './shared/shared.module';
// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './core/state';
import { EffectsModule } from '@ngrx/effects';
import { UserAuthEffects } from './core/state/user-auth/user-auth.effects';
// Mat
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // CDK
    OverlayModule,
    // Module
    SharedModule,
    // Mat
    MatSnackBarModule,
    // Store
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([UserAuthEffects])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
