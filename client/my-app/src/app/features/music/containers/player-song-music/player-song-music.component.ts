import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Interface
import { SongMusic } from '../../core/interface/song-music.interface';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectDefaultSongsMusicPlayer, selectPlaylistIdPlaySongsMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';
import { SavePlaysongsMusicPlayer, PlayPlaysongMusicPlayer, RemoveAllDefaultSongMusicplayer, PlayAllDefaultSongsMuicPlayer } from 'src/app/user-main/state/music-player/music-playler.actions';

@Component({
  selector: 'app-player-song-music',
  templateUrl: './player-song-music.component.html',
  styleUrls: ['./player-song-music.component.scss']
})
export class PlayerSongMusicComponent implements OnInit {
  songs$: Observable<SongMusic[]>;
  activePlaylistId = 'default';
  playlistIdInPlaysongs: string;
  constructor(
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.songs$ = this.store$.pipe(select(selectDefaultSongsMusicPlayer));
    this.store$.pipe(select(selectPlaylistIdPlaySongsMusicPlayer)).subscribe(res => this.playlistIdInPlaysongs = res);
  }
  /*
  @ Play song 
  @ Input: Song id from emitter
  */
  play(res: any) {
    if (this.playlistIdInPlaysongs !== this.activePlaylistId) {
      this.store$.dispatch(new SavePlaysongsMusicPlayer({
        songId: res.id,
        songIndex: res.index,
        playlistId: this.activePlaylistId,
        songs: []
      }));
    } else {
      this.store$.dispatch(new PlayPlaysongMusicPlayer({ songId: res.id, songIndex: res.index }));
    }
  }
  /*
  @ Delete all default songs
  */
  deleteAll() {
    this.store$.dispatch(new RemoveAllDefaultSongMusicplayer());
  }
  /*
  @ Play all songs
  */
  playAll() {
    this.store$.dispatch(new PlayAllDefaultSongsMuicPlayer());
  }
}
