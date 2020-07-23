import { Injectable, Pipe } from '@angular/core';
// Rxjs
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
// Store
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { MusicActionTypes, LoadTopSongs, SaveTopSongs, LoadTopAlbums, SaveTopAlbums, LoadUserSongs, SaveUserSongs, LoadUserAlbums, SaveUserAlbums } from './music.actions';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { Actions, Effect, ofType } from '@ngrx/effects';
// Service
import { LocalService } from './../../../shared/services/local.service';
import { MusicService } from '../services/music.service';
// Key
import { keySongDefault } from './../../../shared/core/key/local';
// Interface
import { SongMusic } from '../core/interface/song-music.interface';

@Injectable()
export class MusicEffects {
  // User song    
  @Effect()
  loadUserSong$ = this.actions$.pipe(
    ofType<LoadUserSongs>(MusicActionTypes.LoadUserSongs),
    withLatestFrom(this.store$.select(selectUserId)),
    mergeMap(([action, userId]) => this.musicService.getUserSongs(userId)),
    map(songs => new SaveUserSongs({ songs: songs === null ? [] : songs }))
  )

  // Top song
  @Effect()
  loadTopSongs$ = this.actions$.pipe(
    ofType<LoadTopSongs>(MusicActionTypes.LoadTopSongs),
    mergeMap(() => this.musicService.getTopSong()),
    map(songs => new SaveTopSongs({ songs: songs }))
  )
  // Top album
  @Effect()
  loadTopAlbum$ = this.actions$.pipe(
    ofType<LoadTopAlbums>(MusicActionTypes.LoadTopAlbums),
    mergeMap(() => this.musicService.getTopAlbum()),
    map(albums => new SaveTopAlbums({ albums: albums }))
  )
  // User album
  @Effect()
  loadUserAlbum$ = this.actions$.pipe(
    ofType<LoadUserAlbums>(MusicActionTypes.LoadUserAlbums),
    withLatestFrom(this.store$.select(selectUserId)),
    mergeMap(([action, userId]) => this.musicService.getAlbums(userId)),
    map(albums => new SaveUserAlbums({ albums: albums }))
  )
  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private musicService: MusicService,
    private storageService: LocalService,
  ) { }

}
