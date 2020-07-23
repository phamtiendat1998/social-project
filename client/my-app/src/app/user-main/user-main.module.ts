import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Routing
import { UserMainRoutingModule } from './user-main-routing.module';
// Components
import { HomePageComponent } from './containers/home-page/home-page.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { RightTabComponent } from './components/right-tab/right-tab.component';
import { BottomTabComponent } from './components/bottom-tab/bottom-tab.component';
// Mat
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
// Module
import { PostModule } from './../features/post/post.module';
import { MusicModule } from './../features/music/music.module';
import { InteractionModule } from './../features/interaction/interaction.module';
import { AdvertiseModule } from './../features/advertise/advertise.module';
import { EventModule } from './../features/event/event.module';
import { EffectsModule } from '@ngrx/effects';
import { MusicPlayerEffects } from './state/music-player/music-player.effects';
// Store
import * as fromMusicPlayer from './state/music-player/music-player.reducer';
import { StoreModule } from '@ngrx/store';
@NgModule({
  declarations: [HomePageComponent, UserMenuComponent, RightTabComponent, BottomTabComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Routing
    UserMainRoutingModule,
    // Mat
    MatButtonModule,
    MatIconModule,
    // Module
    MusicModule,
    PostModule,
    InteractionModule,
    AdvertiseModule,
    EventModule,
    // Store
    StoreModule.forFeature('musicPlayer', fromMusicPlayer.reducer),
    EffectsModule.forFeature([MusicPlayerEffects]),
  ]
})
export class UserMainModule { }
