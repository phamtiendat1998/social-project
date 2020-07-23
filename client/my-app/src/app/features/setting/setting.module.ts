import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module
import { SharedModule } from 'src/app/shared/shared.module';
// Routing
import { SettingRoutingModule } from './setting-routing.module';
// Mat
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Components
import { UserSettingComponent } from './containers/user-setting/user-setting.component';
import { ThemeSettingComponent } from './components/theme-setting/theme-setting.component';
import { AccountSettingComponent } from './containers/account-setting/account-setting.component';
import { AppSettingComponent } from './containers/app-setting/app-setting.component';




@NgModule({
  declarations: [
    UserSettingComponent,
    ThemeSettingComponent,
    AccountSettingComponent,
    AppSettingComponent
  ],
  imports: [
    CommonModule,
    // Module
    SharedModule,
    // Mat
    MatRadioModule,
    MatExpansionModule,
    MatSlideToggleModule,
    // Routing
    SettingRoutingModule
  ]
})
export class SettingModule { }
