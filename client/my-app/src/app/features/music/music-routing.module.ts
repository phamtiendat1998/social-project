import { SongsAlbumResolveService } from './services/songs-album-resolve.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Component
import { TopTenAlbumMusicComponent } from './containers/top-ten-album-music/top-ten-album-music.component';
import { UserAlbumMusicComponent } from './containers/user-album-music/user-album-music.component';
import { DetailAlbumMusicComponent } from './containers/detail-album-music/detail-album-music.component';
import { SearchMusicComponent } from './containers/search-music/search-music.component';
import { TrendMusicComponent } from './containers/trend-music/trend-music.component';
import { MusicComponent } from './containers/music/music.component';
import { UserSongMusicComponent } from './containers/user-song-music/user-song-music.component';
import { TopTenSongMusicComponent } from './containers/top-ten-song-music/top-ten-song-music.component';
import { MostListenMusicComponent } from './containers/most-listen-music/most-listen-music.component';
import { PlayerAlbumMusicComponent } from './containers/player-album-music/player-album-music.component';
import { PlayerSongMusicComponent } from './containers/player-song-music/player-song-music.component';
import { OwnDetailAlbumMusicComponent } from './containers/own-detail-album-music/own-detail-album-music.component';
// Resolve
import { DetailAlbumResolveService } from './services/detail-album-resolve.service';

const routes: Routes = [
    {
        path: '', component: MusicComponent, children: [
            { path: '', redirectTo: 'trend', pathMatch: 'full' },
            { path: 'trend', component: TrendMusicComponent },
            { path: 'song', component: UserSongMusicComponent },
            { path: 'album', component: UserAlbumMusicComponent },
            { path: 'search', component: SearchMusicComponent },
            { path: 'detail/:id', component: DetailAlbumMusicComponent, resolve: { album: DetailAlbumResolveService, songs: SongsAlbumResolveService } },
            { path: 'own-detail/:id', component: OwnDetailAlbumMusicComponent, resolve: { album: DetailAlbumResolveService, songs: SongsAlbumResolveService } },
            { path: 'top-song', component: TopTenSongMusicComponent },
            { path: 'top-album', component: TopTenAlbumMusicComponent },
            { path: 'listen', component: MostListenMusicComponent },
            { path: 'playing-song', component: PlayerSongMusicComponent },
            { path: 'playing-album', component: PlayerAlbumMusicComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MusicRoutingModule { }
