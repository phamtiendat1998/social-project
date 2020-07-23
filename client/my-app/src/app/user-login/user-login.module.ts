import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Mat
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// Routing
import { UserLoginRoutingModule } from './user-login-routing.module';
// Module
import { SharedModule } from './../shared/shared.module';
// Pages
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';
// Service
import { UserLoginService } from './services/user-login.service';
import { LoginPageComponent } from './containers/login-page/login-page.component';
// Store
@NgModule({
  declarations: [
    // Components
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    LandingPageComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // Mat
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressBarModule,
    // Routing
    UserLoginRoutingModule,
  ],
  providers: [
    UserLoginService
  ]
})
export class UserLoginModule { }
