import { SongMusic } from '../core/interface/song-music.interface';
import { Action } from '@ngrx/store';
import { AlbumMusic } from '../core/interface/album-music.interface';

export enum MusicActionTypes {
  // User song
  LoadUserSongs = '[Music] Load User Songs',
  SaveUserSongs = '[Music] Save User Songs',
  AddUserSong = '[Music] Add User Song',
  RemoveUserSong = '[Music] Remove User Song',
  // Top song
  LoadTopSongs = '[Music] Load Top Songs',
  SaveTopSongs = '[Music] Save Top Songs',
  // Top album
  LoadTopAlbums = '[Music] Load Top Albums',
  SaveTopAlbums = '[Music] Save Top Albums',
  // User album
  LoadUserAlbums = '[Music] Load User Albums',
  SaveUserAlbums = '[Music] Save User Albums',
  AddUserAlbum = '[Music] Add User Album',
  SaveUserAlbum = '[Music] Save User Album',
  RemoveUserAlbum = '[Music] Remove User Album',
  NoActionMusic = '[Music] No Action Music',
}
// User song
export class LoadUserSongs implements Action {
  readonly type = MusicActionTypes.LoadUserSongs;
}

export class SaveUserSongs implements Action {
  readonly type = MusicActionTypes.SaveUserSongs;
  constructor(public payload: { songs: SongMusic[] }) { }
}

export class AddUserSong implements Action {
  readonly type = MusicActionTypes.AddUserSong;
  constructor(public payload: { song: SongMusic }) { }
}

export class RemoveUserSong implements Action {
  readonly type = MusicActionTypes.RemoveUserSong;
  constructor(public payload: { songId: string }) { }
}

// Top song
export class LoadTopSongs implements Action {
  readonly type = MusicActionTypes.LoadTopSongs;
}

export class SaveTopSongs implements Action {
  readonly type = MusicActionTypes.SaveTopSongs;
  constructor(public payload: { songs: SongMusic[] }) { }
}
// Top album
export class LoadTopAlbums implements Action {
  readonly type = MusicActionTypes.LoadTopAlbums;
}

export class SaveTopAlbums implements Action {
  readonly type = MusicActionTypes.SaveTopAlbums;
  constructor(public payload: { albums: AlbumMusic[] }) { }
}
// User album
export class LoadUserAlbums implements Action {
  readonly type = MusicActionTypes.LoadUserAlbums;
}

export class SaveUserAlbums implements Action {
  readonly type = MusicActionTypes.SaveUserAlbums;
  constructor(public payload: { albums: AlbumMusic[] }) { }
}

export class AddUserAlbum implements Action {
  readonly type = MusicActionTypes.AddUserAlbum;
  constructor(public payload: { album: AlbumMusic }) { }
}

export class RemoveUserAlbum implements Action {
  readonly type = MusicActionTypes.RemoveUserAlbum;
  constructor(public payload: { albumId: string }) { }
}

// No Action
export class NoActionMusic implements Action {
  readonly type = MusicActionTypes.NoActionMusic;
}
export type MusicActions =
  LoadUserSongs |
  SaveUserSongs |
  AddUserSong |
  RemoveUserSong |
  LoadTopSongs |
  SaveTopSongs |
  LoadTopAlbums |
  SaveTopAlbums |
  LoadUserAlbums |
  SaveUserAlbums |
  AddUserAlbum |
  RemoveUserAlbum |
  NoActionMusic;
