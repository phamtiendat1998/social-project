import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// Rxjs
// Interface
import { DetailAlbumMusic } from '../../core/interface/detail-album-music.interface';
import { SongMusic } from '../../core/interface/song-music.interface';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectIsAddPlaylistMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';
import { Observable } from 'rxjs';
import { AddPlaylistMusicPLaylers, PlayAlbumPlaysongsMusicPlayer } from 'src/app/user-main/state/music-player/music-playler.actions';

@Component({
  selector: 'app-detail-album-music',
  templateUrl: './detail-album-music.component.html',
  styleUrls: ['./detail-album-music.component.scss']
})
export class DetailAlbumMusicComponent implements OnInit {
  album: DetailAlbumMusic;
  songs: SongMusic[];
  isAdded$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<AppState>,
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
  @ Event play album no add playlist
  */
  onPlayAlbum() {
    this.store$.dispatch(new PlayAlbumPlaysongsMusicPlayer({
      albumId: this.album.albumId
    }));
  }
  /*
  @ Event add album into playlist
  */
  addAlbumIntoPlaylist() {
    this.store$.dispatch(new AddPlaylistMusicPLaylers({ albumId: this.album.albumId, name: this.album.name, cover: this.album.cover }));
  }
}
