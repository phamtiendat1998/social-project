import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { AddDefaultSongMusicPlayers, SavePlaysongsMusicPlayer } from './../../../../user-main/state/music-player/music-playler.actions';
import { selectIsAddSongDefaultSongsMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';

// Interface
import { SongMusic } from './../../core/interface/song-music.interface';

@Component({
  selector: 'app-top-song-item-music',
  templateUrl: './top-song-item-music.component.html',
  styleUrls: ['./top-song-item-music.component.scss']
})
export class TopSongItemMusicComponent implements OnInit {
  @Input() song: SongMusic;
  @Input() index: number;
  @Input() noBorder: boolean;
  isAdded$: Observable<boolean>;
  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.isAdded$ = this.store$.pipe(select(selectIsAddSongDefaultSongsMusicPlayer, { id: this.song.id }));
  }
  /*
  @ Event ddd song into default playlist
  */
  onAddSong() {
    this.store$.dispatch(new AddDefaultSongMusicPlayers({ song: this.song }));
  }
  /*
  @ Event play song no add playlist
  */
  onPlaySong() {
    this.store$.dispatch(new SavePlaysongsMusicPlayer({
      playlistId: 'no-playlist',
      songId: this.song.id,
      songIndex: 0,
      songs: [this.song]
    }));
  }
}
