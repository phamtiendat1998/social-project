import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Guard
import { UserLoginAuthGuard } from './core/guards/user-login-auth.guard';
import { UserMainAuthGuard } from './core/guards/user-main-auth.guard';
// Components
import { Error404Component } from './shared/containers/error404/error404.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'welcome',
    canActivate: [UserLoginAuthGuard],
    loadChildren: () => import('./user-login/user-login.module').then(m => m.UserLoginModule)
  },
  {
    path: 'home',
    canActivate: [UserMainAuthGuard],
    loadChildren: () => import('./user-main/user-main.module').then(m => m.UserMainModule)
  },
  {
    path: 'error',
    component: Error404Component
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
