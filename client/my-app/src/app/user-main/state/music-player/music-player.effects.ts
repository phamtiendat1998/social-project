import { Injectable } from '@angular/core';
// Rxjs
import { map, tap, mergeMap } from 'rxjs/operators';
import { Observable, empty, from, of } from 'rxjs';
// Store
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  LoadPlaylistsMusicPlaylers,
  MusicPlaylerActionTypes,
  SavePlaylistsMusicPLaylers,
  SaveDefaultPlaylistMusicPLaylers,
  NoActionMusicPlayer,
  AddPlaylistMusicPLaylers,
  SavePlaylistMusicPLaylers,
  LoadDefaultPlaylistMusicPLaylers,
  LoadDefaultSongsMusicPlayers,
  AddDefaultSongMusicPlayers,
  RemoveDefaultSongMusicPlayers,
  SaveDefaultSongsMusicPlayers,
  PlayAlbumPlaysongsMusicPlayer,
  SavePlaysongsMusicPlayer,
  RemoveAllDefaultSongMusicplayer,
  RemovePlaylistMusicPLaylers,
  RemoveAllPlaylistMusicPLaylers,
} from './music-playler.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectPlaylistIdPlaySongsMusicPlayer, selectDefaultSongsMusicPlayer } from './music-player.selectors';
// Service
import { LocalService } from 'src/app/shared/services/local.service';
import { MusicService } from './../../../features/music/services/music.service';
// Key
import { keySongDefault, keyPlaylist } from './../../../shared/core/key/local';
// Interface
import { PlaylistPlayerMusic } from 'src/app/features/music/core/interface/playlist-player-music.interface';
import { SongMusic } from './../../../features/music/core/interface/song-music.interface';

@Injectable()
export class MusicPlayerEffects {

  // Playlist
  @Effect()
  loadDefaultPlaylistMusicPLaylers$ = this.actions$.pipe(
    ofType<LoadDefaultPlaylistMusicPLaylers>(MusicPlaylerActionTypes.LoadDefaultPlaylistMusicPLaylers),
    map(() => {
      const defaultPlaylist: PlaylistPlayerMusic = {
        id: 'default',
        name: 'Danh sách phát',
        cover: null
      };
      return new SaveDefaultPlaylistMusicPLaylers({ playlist: defaultPlaylist });
    })
  )

  @Effect()
  addPlaylistMusicPlayers$ = this.actions$.pipe(
    ofType<AddPlaylistMusicPLaylers>(MusicPlaylerActionTypes.AddPlaylistMusicPLaylers),
    tap(action => {
      let playlists: PlaylistPlayerMusic[] = [];
      if (this.storageService.check(keyPlaylist)) {
        playlists = JSON.parse(this.storageService.get(keyPlaylist));
      }
      const playlist: PlaylistPlayerMusic = {
        id: action.payload.albumId,
        name: action.payload.name,
        cover: action.payload.cover
      };
      playlists.push(playlist);
      this.storageService.save(keyPlaylist, JSON.stringify(playlists));
    }),
    map(action => {
      const playlist: PlaylistPlayerMusic = {
        id: action.payload.albumId,
        name: action.payload.name,
        cover: action.payload.cover
      };
      return new SavePlaylistMusicPLaylers({ playlist: playlist })
    })
  )

  @Effect()
  loadPlaylistMusicPlayers$ = this.actions$.pipe(
    ofType<LoadPlaylistsMusicPlaylers>(MusicPlaylerActionTypes.LoadPlaylistsMusicPlaylers),
    map(() => {
      if (this.storageService.check(keyPlaylist)) {
        const playlists: PlaylistPlayerMusic[] = JSON.parse(this.storageService.get(keyPlaylist));
        return new SavePlaylistsMusicPLaylers({ playlists: playlists })
      } else {
        return new NoActionMusicPlayer();
      }
    })
  )

  @Effect({ dispatch: false })
  removePlaylist$ = this.actions$.pipe(
    ofType<RemovePlaylistMusicPLaylers>(MusicPlaylerActionTypes.RemovePlaylistMusicPLaylers),
    tap(action => {
      const albums: PlaylistPlayerMusic[] = JSON.parse(this.storageService.get(keyPlaylist));
      const albumIds = albums.map(item => item.id);
      albums.splice(albumIds.indexOf(action.payload.albumId), 1);
      this.storageService.save(keyPlaylist, JSON.stringify(albums));
    }),
  )

  @Effect()
  removeAllPlaylist$ = this.actions$.pipe(
    ofType<RemoveAllPlaylistMusicPLaylers>(MusicPlaylerActionTypes.RemoveAllPlaylistMusicPLaylers),
    tap(action => {
      const albums: PlaylistPlayerMusic[] = [];
      this.storageService.save(keyPlaylist, JSON.stringify(albums));
    }),
    map(() => {
      const defaultPlaylist: PlaylistPlayerMusic = {
        id: 'default',
        name: 'Danh sách phát',
        cover: null
      };
      return new SaveDefaultPlaylistMusicPLaylers({ playlist: defaultPlaylist });
    })
  )

  // Default songs
  @Effect()
  loadDefaultSongsMusicPlayer$ = this.actions$.pipe(
    ofType<LoadDefaultSongsMusicPlayers>(MusicPlaylerActionTypes.LoadDefaultSongsMusicPlayers),
    map(() => {
      if (this.storageService.check(keySongDefault)) {
        const songs: SongMusic[] = JSON.parse(this.storageService.get(keySongDefault));
        return new SaveDefaultSongsMusicPlayers({ songs: songs });
      } else {
        return new NoActionMusicPlayer();
      }
    })
  )

  @Effect({ dispatch: false })
  addDefaultSongPlaylist$ = this.actions$.pipe(
    ofType<AddDefaultSongMusicPlayers>(MusicPlaylerActionTypes.AddDefaultSongMusicPlayers),
    tap(action => {
      let songs: SongMusic[] = [];
      if (this.storageService.check(keySongDefault)) {
        songs = JSON.parse(this.storageService.get(keySongDefault));
      }
      songs.push(action.payload.song);
      this.storageService.save(keySongDefault, JSON.stringify(songs));
    }),
  )

  @Effect({ dispatch: false })
  removeDefaultSongPlaylist$ = this.actions$.pipe(
    ofType<RemoveDefaultSongMusicPlayers>(MusicPlaylerActionTypes.RemoveDefaultSongMusicPlayers),
    tap(action => {
      const songs: SongMusic[] = JSON.parse(this.storageService.get(keySongDefault));
      const songIds = songs.map(item => item.id);
      songs.splice(songIds.indexOf(action.payload.songId), 1);
      this.storageService.save(keySongDefault, JSON.stringify(songs));
    }),
  )

  @Effect({ dispatch: false })
  removeAllDefaultSongPlaylist$ = this.actions$.pipe(
    ofType<RemoveAllDefaultSongMusicplayer>(MusicPlaylerActionTypes.RemoveAllDefaultSongMusicplayer),
    tap(action => {
      const songs: SongMusic[] = [];
      this.storageService.save(keySongDefault, JSON.stringify(songs));
    }),
  )

  // Playsongs
  @Effect()
  playAlbumPlaysongsMusicPlayer$ = this.actions$.pipe(
    ofType<PlayAlbumPlaysongsMusicPlayer>(MusicPlaylerActionTypes.PlayAlbumPlaysongsMusicPlayer),
    mergeMap(action => this.musicService.getSongOfAlbum(action.payload.albumId)),
    map(songs => new SavePlaysongsMusicPlayer({ songId: songs[0].id, songIndex: 0, playlistId: 'no-playlist', songs: songs }))
  )

  constructor(
    private actions$: Actions,
    private storageService: LocalService,
    private musicService: MusicService,
  ) { }

}
