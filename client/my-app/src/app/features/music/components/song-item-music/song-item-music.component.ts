import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// Mat
import { MatDialog } from '@angular/material/dialog';
import { DialogDeteleSongMusicComponent } from '../dialog-detele-song-music/dialog-detele-song-music.component';
// Rxjs
import { Observable, empty } from 'rxjs';
// Interface
import { SongMusic } from '../../core/interface/song-music.interface';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { AddDefaultSongMusicPlayers, SavePlaysongsMusicPlayer } from 'src/app/user-main/state/music-player/music-playler.actions';
import { selectIsAddSongDefaultSongsMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';
import { selectFullnameUserInfo } from 'src/app/core/state/user-auth/user-auth.selectors';

@Component({
  selector: 'app-song-item-music',
  templateUrl: './song-item-music.component.html',
  styleUrls: ['./song-item-music.component.scss']
})
export class SongItemMusicComponent implements OnInit {
  @Input() song: SongMusic;
  @Input() own: boolean;
  @Output() deleteSongId = new EventEmitter<string>();
  isAdded$: Observable<boolean>;
  userFullname$: Observable<string>;
  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isAdded$ = this.store$.pipe(select(selectIsAddSongDefaultSongsMusicPlayer, { id: this.song.id }));
    this.userFullname$ = this.store$.select(selectFullnameUserInfo);
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
  /*
  @ Event delete song
  */
  onDelete() {
    this.deleteSongId.emit(this.song.id);
  }
}
