import { Component, OnInit, Input } from '@angular/core';
// Mat
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteAlbumMusicComponent } from '../dialog-delete-album-music/dialog-delete-album-music.component';
// Rxjs
import { Observable } from 'rxjs';
// Interface
import { AlbumMusic } from '../../core/interface/album-music.interface';
// Stoe
import { select, Store } from '@ngrx/store';
import { selectIsAddPlaylistMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';
import { AppState } from 'src/app/core/state';
import { AddPlaylistMusicPLaylers, PlayAlbumPlaysongsMusicPlayer } from 'src/app/user-main/state/music-player/music-playler.actions';

@Component({
  selector: 'app-album-item-music',
  templateUrl: './album-item-music.component.html',
  styleUrls: ['./album-item-music.component.scss']
})
export class AlbumItemMusicComponent implements OnInit {
  @Input() isOwn: boolean = false;
  @Input() album: AlbumMusic;
  isAdded$: Observable<boolean>;
  constructor(
    private store$: Store<AppState>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isAdded$ = this.store$.pipe(select(selectIsAddPlaylistMusicPlayer, { id: this.album.id }));
  }
  /*
  @ Event add album into playlist
  */
  addAlbumIntoPlaylist() {
    this.store$.dispatch(new AddPlaylistMusicPLaylers({ albumId: this.album.id, name: this.album.name, cover: this.album.cover }));
  }
  /*
  @ Event play album no add playlist
  */
  onPlayAlbum() {
    this.store$.dispatch(new PlayAlbumPlaysongsMusicPlayer({
      albumId: this.album.id
    }));
  }
  /*
 @ Open dialog remove album
 */
  onClickOpenDialogRemoveAlbum() {
    this.dialog.open(DialogDeleteAlbumMusicComponent, {
      width: '540px',
      data: this.album.id
    });
  }
}
