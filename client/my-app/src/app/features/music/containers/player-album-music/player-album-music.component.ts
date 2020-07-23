import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Interface
import { PlaylistPlayerMusic } from '../../core/interface/playlist-player-music.interface';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectPlaylistsNoDefaultMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';
import { RemoveAllPlaylistMusicPLaylers } from 'src/app/user-main/state/music-player/music-playler.actions';

@Component({
  selector: 'app-player-album-music',
  templateUrl: './player-album-music.component.html',
  styleUrls: ['./player-album-music.component.scss']
})
export class PlayerAlbumMusicComponent implements OnInit {
  albums$: Observable<PlaylistPlayerMusic[]>;

  constructor(
    private store$: Store<AppState>,
  ) { }


  ngOnInit(): void {
    this.albums$ = this.store$.pipe(select(selectPlaylistsNoDefaultMusicPlayer));
  }
  /*
  @
  */
  deleteAll() {
    this.store$.dispatch(new RemoveAllPlaylistMusicPLaylers());
  }
}
