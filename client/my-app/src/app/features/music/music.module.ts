import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module
import { SharedModule } from 'src/app/shared/shared.module';
// Router
import { MusicRoutingModule } from './music-routing.module';
// Mat
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// Components
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { PlayListBoxComponent } from './components/play-list-box/play-list-box.component';
import { MusicComponent } from './containers/music/music.component';
import { TrendMusicComponent } from './containers/trend-music/trend-music.component';
import { SearchMusicComponent } from './containers/search-music/search-music.component';
import { DetailAlbumMusicComponent } from './containers/detail-album-music/detail-album-music.component';
import { TopSongMusicComponent } from './components/top-song-music/top-song-music.component';
import { TopAlbumMusicComponent } from './components/top-album-music/top-album-music.component';
import { UserSongMusicComponent } from './containers/user-song-music/user-song-music.component';
import { UserAlbumMusicComponent } from './containers/user-album-music/user-album-music.component';
import { SkeletonSongMusicComponent } from './components/skeleton-song-music/skeleton-song-music.component';
import { SkeletonAlbumMusicComponent } from './components/skeleton-album-music/skeleton-album-music.component';
import { SongItemMusicComponent } from './components/song-item-music/song-item-music.component';
import { TopSongItemMusicComponent } from './components/top-song-item-music/top-song-item-music.component';
import { AlbumItemMusicComponent } from './components/album-item-music/album-item-music.component';
import { TopAlbumItemMusicComponent } from './components/top-album-item-music/top-album-item-music.component';
import { PlayListItemMusicComponent } from './components/play-list-item-music/play-list-item-music.component';
import { SkeletonPlayListItemMusicComponent } from './components/skeleton-play-list-item-music/skeleton-play-list-item-music.component';
import { DialogUploadSongMusicComponent } from './components/dialog-upload-song-music/dialog-upload-song-music.component';
import { PreviewSongMusicComponent } from './components/preview-song-music/preview-song-music.component';
import { DialogDeteleSongMusicComponent } from './components/dialog-detele-song-music/dialog-detele-song-music.component';
import { DialogCreateAlbumMusicComponent } from './components/dialog-create-album-music/dialog-create-album-music.component';
import { TopTenSongMusicComponent } from './containers/top-ten-song-music/top-ten-song-music.component';
import { TopTenAlbumMusicComponent } from './containers/top-ten-album-music/top-ten-album-music.component';
import { MostListenMusicComponent } from './containers/most-listen-music/most-listen-music.component';
import { PlayerSongMusicComponent } from './containers/player-song-music/player-song-music.component';
import { PlayerAlbumMusicComponent } from './containers/player-album-music/player-album-music.component';
import { PlayListAlbumItemMusicComponent } from './components/play-list-album-item-music/play-list-album-item-music.component';
import { DialogDeleteAlbumMusicComponent } from './components/dialog-delete-album-music/dialog-delete-album-music.component';
// Store
import { EffectsModule } from '@ngrx/effects';
import { MusicEffects } from './state/music.effects';
import { StoreModule } from '@ngrx/store';
import * as fromMusic from './state/music.reducer';
import { OwnDetailAlbumMusicComponent } from './containers/own-detail-album-music/own-detail-album-music.component';
import { DialogDeleteSongOfAlbumMusicComponent } from './components/dialog-delete-song-of-album-music/dialog-delete-song-of-album-music.component';




@NgModule({
  declarations: [
    MusicPlayerComponent,
    PlayListBoxComponent,
    MusicComponent,
    TrendMusicComponent,
    SearchMusicComponent,
    DetailAlbumMusicComponent,
    TopSongMusicComponent,
    TopAlbumMusicComponent,
    UserSongMusicComponent,
    UserAlbumMusicComponent,
    SkeletonSongMusicComponent,
    SkeletonAlbumMusicComponent,
    SongItemMusicComponent,
    TopSongItemMusicComponent,
    AlbumItemMusicComponent,
    TopAlbumItemMusicComponent,
    PlayListItemMusicComponent,
    SkeletonPlayListItemMusicComponent,
    DialogUploadSongMusicComponent,
    PreviewSongMusicComponent,
    DialogDeteleSongMusicComponent,
    DialogCreateAlbumMusicComponent,
    TopTenSongMusicComponent,
    TopTenAlbumMusicComponent,
    MostListenMusicComponent,
    PlayerSongMusicComponent,
    PlayerAlbumMusicComponent,
    PlayListAlbumItemMusicComponent,
    DialogDeleteAlbumMusicComponent,
    OwnDetailAlbumMusicComponent,
    DialogDeleteSongOfAlbumMusicComponent
  ],
  imports: [
    CommonModule,
    // Nodule
    SharedModule,
    // Router
    MusicRoutingModule,
    // Mat
    MatSliderModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressBarModule,
    // Store
    StoreModule.forFeature('music', fromMusic.reducer),
    EffectsModule.forFeature([MusicEffects])
  ],
  exports: [MusicPlayerComponent]
})
export class MusicModule { }
