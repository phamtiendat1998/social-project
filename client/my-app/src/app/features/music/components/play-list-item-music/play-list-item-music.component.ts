import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { RemoveDefaultSongMusicPlayers } from './../../../../user-main/state/music-player/music-playler.actions';
import { selectIsPlayingSongMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';
import { selectFullnameUserInfo } from 'src/app/core/state/user-auth/user-auth.selectors';
// Interfacce
import { SongMusic } from 'src/app/features/music/core/interface/song-music.interface';

@Component({
  selector: 'app-play-list-item-music',
  templateUrl: './play-list-item-music.component.html',
  styleUrls: ['./play-list-item-music.component.scss']
})
export class PlayListItemMusicComponent implements OnInit {
  @Input() song: SongMusic;
  @Input() index: number;
  @Input() playlistId: string;
  @Input() inPlayer: boolean;
  @Output() songId = new EventEmitter<any>();
  played$: Observable<boolean>;
  userFullname$: Observable<string>;
  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.played$ = this.store$.pipe(select(selectIsPlayingSongMusicPlayer, { id: this.song.id, playlistId: this.playlistId }));
    this.userFullname$ = this.store$.select(selectFullnameUserInfo);
  }
  /*
  @ Delete song
  */
  delete() {
    this.store$.dispatch(new RemoveDefaultSongMusicPlayers({ songId: this.song.id }));
  }
  /*
  @ Play song
  */
  play() {
    this.songId.emit({ id: this.song.id, index: this.index });
  }
}
