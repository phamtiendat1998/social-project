import { Component, OnInit } from '@angular/core';
// Mat
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadSongMusicComponent } from './../../components/dialog-upload-song-music/dialog-upload-song-music.component';
// Rxjs
import { Observable } from 'rxjs';
// Store
import { AppState } from 'src/app/core/state';
import { LoadUserSongs } from './../../state/music.actions';
import { Store, select } from '@ngrx/store';
import { selectUserSongsMusic } from '../../state/music.selectors';
// Interfacce
import { SongMusic } from '../../core/interface/song-music.interface';
import { DialogDeteleSongMusicComponent } from '../../components/dialog-detele-song-music/dialog-detele-song-music.component';

@Component({
  selector: 'app-user-song-music',
  templateUrl: './user-song-music.component.html',
  styleUrls: ['./user-song-music.component.scss']
})
export class UserSongMusicComponent implements OnInit {
  userSongs$: Observable<SongMusic[]>;
  constructor(
    public dialog: MatDialog,
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(new LoadUserSongs());
    this.userSongs$ = this.store$.pipe(select(selectUserSongsMusic));
  }
  /*
  @ Open dialog upload song
  */
  openDialogUploadSong(): void {
    this.dialog.open(DialogUploadSongMusicComponent, {
      width: '540px',
      maxHeight: '80vh',
      data: null
    });
  }
  /*
  @ Open dialog delete song
  */
  openDialogDeleteSong(songId: string): void {
    this.dialog.open(DialogDeteleSongMusicComponent, {
      width: '540px',
      data: songId
    });
  }
}
