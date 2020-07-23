import { AppSettingComponent } from './containers/app-setting/app-setting.component';
import { AccountSettingComponent } from './containers/account-setting/account-setting.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingComponent } from './containers/user-setting/user-setting.component';
import { ThemeSettingComponent } from './components/theme-setting/theme-setting.component';
const routes: Routes = [
    {
        path: '', component: UserSettingComponent, children: [
            { path: '', redirectTo: 'account', pathMatch: 'full' },
            { path: 'account', component: AccountSettingComponent },
            { path: 'app', component: AppSettingComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
