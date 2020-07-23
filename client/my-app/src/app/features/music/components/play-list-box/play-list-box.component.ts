import { tap, finalize } from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
// Rxjs
import { Observable, Subscription } from 'rxjs';
// Serivce
import { MusicService } from './../../services/music.service';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { PlaylistPlayerMusic } from '../../core/interface/playlist-player-music.interface';
import {
  selectPlaylistsMusicPlayer,
  selectDefaultSongsMusicPlayer,
  selectPlaylistIdPlaySongsMusicPlayer
} from 'src/app/user-main/state/music-player/music-player.selectors';
import { SavePlaysongsMusicPlayer, PlayPlaysongMusicPlayer } from 'src/app/user-main/state/music-player/music-playler.actions';
// Interface 
import { SongMusic } from './../../core/interface/song-music.interface';

@Component({
  selector: 'app-play-list-box',
  templateUrl: './play-list-box.component.html',
  styleUrls: ['./play-list-box.component.scss']
})
export class PlayListBoxComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter();
  playlists$: Observable<PlaylistPlayerMusic[]>;
  songsSub$: Subscription;
  playlistIdPlaySongs$: Subscription;
  songs: SongMusic[];
  activePlaylistId = 'default';
  playlistIdInPlaysongs: string;
  loading = false;
  constructor(
    private store$: Store<AppState>,
    private musicService: MusicService
  ) { }

  ngOnInit(): void {
    this.playlists$ = this.store$.pipe(select(selectPlaylistsMusicPlayer));
    this.songsSub$ = this.store$.pipe(select(selectDefaultSongsMusicPlayer)).subscribe(songs => this.songs = songs);
    this.playlistIdPlaySongs$ = this.store$.pipe(select(selectPlaylistIdPlaySongsMusicPlayer)).subscribe(res => this.playlistIdInPlaysongs = res);
  }
  ngOnDestroy() {
    this.songsSub$.unsubscribe();
    this.playlistIdPlaySongs$.unsubscribe()
  }
  /*
  @ Event close box
  */
  onCloseBox() {
    this.close.emit();
  }
  /*
  @ Event change tab index
  @ Input: Playlist id
  */
  onOpenTab(id: string) {
    if (this.songsSub$) {
      this.songsSub$.unsubscribe();
    }
    if (this.loading) { return; }
    if (this.activePlaylistId === id) { return; }
    this.activePlaylistId = id;
    if (id === 'default') {
      this.songsSub$ = this.store$.pipe(select(selectDefaultSongsMusicPlayer)).subscribe(songs => {
        this.songs = songs;
      });
    } else {
      this.loading = true;
      this.songsSub$ = this.musicService.getSongOfAlbum(id).subscribe(songs => {
        this.loading = false;
        if (songs !== null || songs.length > 0) {
          this.songs = songs;
        } else {
          return;
        }
      });
    }
  }
  /*
  @ Play song 
  @ Input: Song id from emitter
  */
  play(res: any) {
    if (this.playlistIdInPlaysongs !== this.activePlaylistId) {
      this.store$.dispatch(new SavePlaysongsMusicPlayer({
        songId: res.id,
        songIndex: res.index,
        playlistId: this.activePlaylistId,
        songs: this.activePlaylistId === 'default' ? [] : this.songs
      }));
    } else {
      this.store$.dispatch(new PlayPlaysongMusicPlayer({ songId: res.id, songIndex: res.index }));
    }
  }
}
