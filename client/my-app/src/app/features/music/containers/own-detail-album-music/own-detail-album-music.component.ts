import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Mat
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadSongMusicComponent } from '../../components/dialog-upload-song-music/dialog-upload-song-music.component';
import { DialogCreateAlbumMusicComponent } from '../../components/dialog-create-album-music/dialog-create-album-music.component';
import { DialogDeleteSongOfAlbumMusicComponent } from '../../components/dialog-delete-song-of-album-music/dialog-delete-song-of-album-music.component';
// Rxjs
import { Observable, Subscription } from 'rxjs';
// Interface
import { DetailAlbumMusic } from '../../core/interface/detail-album-music.interface';
import { SongMusic } from '../../core/interface/song-music.interface';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectIsAddPlaylistMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';
import { AddPlaylistMusicPLaylers, PlayAlbumPlaysongsMusicPlayer } from 'src/app/user-main/state/music-player/music-playler.actions';

@Component({
  selector: 'app-own-detail-album-music',
  templateUrl: './own-detail-album-music.component.html',
  styleUrls: ['./own-detail-album-music.component.scss']
})
export class OwnDetailAlbumMusicComponent implements OnInit {
  album: DetailAlbumMusic;
  songs: SongMusic[];
  isAdded$: Observable<boolean>;
  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppState>,
    private dialog: MatDialog,
  ) {
    this.route.data.subscribe(data => {
      this.album = data.album;
      this.songs = data.songs == null ? [] : data.songs;
    });
  }
  ngOnInit(): void {
    this.isAdded$ = this.store$.pipe(select(selectIsAddPlaylistMusicPlayer, { id: this.album.albumId }));
  }
  /*
 @ Event add album into playlist
 */
  addAlbumIntoPlaylist() {
    this.store$.dispatch(new AddPlaylistMusicPLaylers({ albumId: this.album.albumId, name: this.album.name, cover: this.album.cover }));
  }
  /*
  @ Event play album no add playlist
  */
  onPlayAlbum() {
    this.store$.dispatch(new PlayAlbumPlaysongsMusicPlayer({
      albumId: this.album.albumId
    }));
  }
  /*
  @ Open dialog upload song
  */
  openDialogUploadSong(): void {
    const dialog = this.dialog.open(DialogUploadSongMusicComponent, {
      width: '540px',
      maxHeight: '80vh',
      data: this.album.albumId
    });
    const dialog$: Subscription = dialog.afterClosed().subscribe(res => {
      if (res) {
        this.songs.push(res);
        this.album.quantitySong++;
      } else {
        return;
      }
      dialog$.unsubscribe();
    })
  }
  /*
  @ Open dialog edit albunm
  */
  openDialogEditAlbumAlbum(): void {
    const dialog = this.dialog.open(DialogCreateAlbumMusicComponent, {
      width: '540px',
      maxHeight: '80vh',
      data: this.album
    });
    const dialog$: Subscription = dialog.afterClosed().subscribe(res => {
      if (res) {
        this.album = res;
      } else {
        return;
      }
      dialog$.unsubscribe();
    })
  }
  /*
  @ Open dialog delete song
  */
  openDialogDeleteSong(songId: string): void {
    const dialog = this.dialog.open(DialogDeleteSongOfAlbumMusicComponent, {
      width: '540px',
      data: songId
    });
    const dialog$: Subscription = dialog.afterClosed().subscribe(res => {
      if (res) {
        this.songs = this.songs.filter(item => item.id !== res);
        this.album.quantitySong--;
      } else {
        return;
      }
      dialog$.unsubscribe();
    })
  }
}
