import { Component, OnInit, Input } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Interface
import { PlaylistPlayerMusic } from '../../core/interface/playlist-player-music.interface';
// Store
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { RemovePlaylistMusicPLaylers, PlayAlbumPlaysongsMusicPlayer } from 'src/app/user-main/state/music-player/music-playler.actions';

@Component({
  selector: 'app-play-list-album-item-music',
  templateUrl: './play-list-album-item-music.component.html',
  styleUrls: ['./play-list-album-item-music.component.scss']
})
export class PlayListAlbumItemMusicComponent implements OnInit {
  @Input() album: PlaylistPlayerMusic;
  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
  }
  /*
  @
  */
  onPlay() {
    this.store$.dispatch(new PlayAlbumPlaysongsMusicPlayer({
      albumId: this.album.id
    }));
  }
  /*
  @
  */
  onDelete() {
    this.store$.dispatch(new RemovePlaylistMusicPLaylers({ albumId: this.album.id }));
  }
}
