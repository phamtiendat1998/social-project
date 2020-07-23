import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Compponents
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';

const routesLogin: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    {
        path: 'acc',
        component: LoginPageComponent,
        children: [
            { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
        ]
    },
    {
        path: 'landing',
        component: LandingPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routesLogin)],
    exports: [RouterModule]
})
export class UserLoginRoutingModule { }
