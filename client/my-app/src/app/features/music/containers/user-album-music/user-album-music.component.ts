import { Component, OnInit } from '@angular/core';
// Mat
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateAlbumMusicComponent } from '../../components/dialog-create-album-music/dialog-create-album-music.component';
// Rxjs
import { Observable } from 'rxjs';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { selectUserAlbumsMusic } from '../../state/music.selectors';
import { LoadUserAlbums } from './../../state/music.actions';
// Interface
import { AlbumMusic } from '../../core/interface/album-music.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-album-music',
  templateUrl: './user-album-music.component.html',
  styleUrls: ['./user-album-music.component.scss']
})
export class UserAlbumMusicComponent implements OnInit {
  albums$: Observable<AlbumMusic[]>;
  constructor(
    public dialog: MatDialog,
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(new LoadUserAlbums());
    this.albums$ = this.store$.pipe(
      select(selectUserAlbumsMusic),
    );
  }
  /*
  @ Open dialog upload albunm
  */
  openDialogUploadAlbum(): void {
    this.dialog.open(DialogCreateAlbumMusicComponent, {
      width: '540px',
      maxHeight: '80vh',
    });
  }
}
