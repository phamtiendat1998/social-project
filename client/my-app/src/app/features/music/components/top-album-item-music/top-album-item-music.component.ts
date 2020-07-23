import { Component, OnInit, Input } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { AddPlaylistMusicPLaylers, PlayAlbumPlaysongsMusicPlayer } from './../../../../user-main/state/music-player/music-playler.actions';
import { selectIsAddPlaylistMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';
// Interface
import { AlbumMusic } from '../../core/interface/album-music.interface';

@Component({
  selector: 'app-top-album-item-music',
  templateUrl: './top-album-item-music.component.html',
  styleUrls: ['./top-album-item-music.component.scss']
})
export class TopAlbumItemMusicComponent implements OnInit {
  @Input() album: AlbumMusic;
  isAdded$: Observable<boolean>;
  constructor(
    private store$: Store<AppState>
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
}
