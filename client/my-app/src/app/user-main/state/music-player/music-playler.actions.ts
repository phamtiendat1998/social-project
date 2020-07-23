import { Action } from '@ngrx/store';
// Interface
import { SongMusic } from './../../../features/music/core/interface/song-music.interface';
import { PlaylistPlayerMusic } from 'src/app/features/music/core/interface/playlist-player-music.interface';

export enum MusicPlaylerActionTypes {
  // Default songs
  LoadDefaultPlaylistMusicPLaylers = '[MusicPlayler] Load Default Playlist Music Playlers',
  SaveDefaultPlaylistMusicPLaylers = '[MusicPlayler] Save Default Playlist Music Playlers',
  LoadDefaultSongsMusicPlayers = '[MusicPlayler] Load Song Into Default Playlist Music Playlers',
  SaveDefaultSongsMusicPlayers = '[MusicPlayler] Save Song Into Default Playlist Music Playlers',
  AddDefaultSongMusicPlayers = '[MusicPlayler] Add Song Into Default Playlist Music Playlers',
  RemoveDefaultSongMusicPlayers = '[MusicPlayler] Remove Song Into Default Playlist Music Playlers',
  RemoveAllDefaultSongMusicplayer = '[MusicPlayler] Remove All Song Into Default Playlist Music Playlers',
  // Playlists
  LoadPlaylistsMusicPlaylers = '[MusicPlayler] Load Playlists Music Playlers',
  SavePlaylistsMusicPLaylers = '[MusicPlayler] Save Playlists Music Playlers',
  SavePlaylistMusicPLaylers = '[MusicPlayler] Save Playlist Music Playlers',
  AddPlaylistMusicPLaylers = '[MusicPlayler] Add Playlist Music Playlers',
  RemovePlaylistMusicPLaylers = '[MusicPlayler] Remove Playlist Music Playlers',
  RemoveAllPlaylistMusicPLaylers = '[MusicPlayler] Remove All Playlist Music Playlers',
  // Playsongs
  SavePlaysongsMusicPlayer = '[MusicPlayler] Save Playsongs Music Playlers',
  PlayPlaysongMusicPlayer = '[MusicPlayler] Play Playsong Music Playlers',
  PrevPlaysongMusicPlayer = '[MusicPlayler] Prev Playsong Music Playlers',
  NextPlaysongMusicPlayer = '[MusicPlayler] Next Playsong Music Playlers',
  PlayAlbumPlaysongsMusicPlayer = '[MusicPlayler] Play Album Playsongs Music Playlers',
  PlayAllDefaultSongsMuicPlayer = '[MusicPlayler] Play All Songs In Default Songs Music Playlers',
  NoActionMusicPlayer = '[MusicPlayler] No Action Music Playlers',
}

// Default songs
export class LoadDefaultPlaylistMusicPLaylers implements Action {
  readonly type = MusicPlaylerActionTypes.LoadDefaultPlaylistMusicPLaylers;
}

export class SaveDefaultPlaylistMusicPLaylers implements Action {
  readonly type = MusicPlaylerActionTypes.SaveDefaultPlaylistMusicPLaylers;
  constructor(public payload: { playlist: PlaylistPlayerMusic }) { }
}

export class LoadDefaultSongsMusicPlayers implements Action {
  readonly type = MusicPlaylerActionTypes.LoadDefaultSongsMusicPlayers;
}

export class SaveDefaultSongsMusicPlayers implements Action {
  readonly type = MusicPlaylerActionTypes.SaveDefaultSongsMusicPlayers;
  constructor(public payload: { songs: SongMusic[] }) { }
}

export class AddDefaultSongMusicPlayers implements Action {
  readonly type = MusicPlaylerActionTypes.AddDefaultSongMusicPlayers;
  constructor(public payload: { song: SongMusic }) { }
}

export class RemoveDefaultSongMusicPlayers implements Action {
  readonly type = MusicPlaylerActionTypes.RemoveDefaultSongMusicPlayers;
  constructor(public payload: { songId: string }) { }
}

export class RemoveAllDefaultSongMusicplayer implements Action {
  readonly type = MusicPlaylerActionTypes.RemoveAllDefaultSongMusicplayer;
}

// Playlists
export class LoadPlaylistsMusicPlaylers implements Action {
  readonly type = MusicPlaylerActionTypes.LoadPlaylistsMusicPlaylers;
}

export class SavePlaylistsMusicPLaylers implements Action {
  readonly type = MusicPlaylerActionTypes.SavePlaylistsMusicPLaylers;
  constructor(public payload: { playlists: PlaylistPlayerMusic[] }) { }
}

export class SavePlaylistMusicPLaylers implements Action {
  readonly type = MusicPlaylerActionTypes.SavePlaylistMusicPLaylers;
  constructor(public payload: { playlist: PlaylistPlayerMusic }) { }
}

export class AddPlaylistMusicPLaylers implements Action {
  readonly type = MusicPlaylerActionTypes.AddPlaylistMusicPLaylers;
  constructor(public payload: { albumId: string, name: string, cover: string }) { }
}

export class RemovePlaylistMusicPLaylers implements Action {
  readonly type = MusicPlaylerActionTypes.RemovePlaylistMusicPLaylers;
  constructor(public payload: { albumId: string }) { }
}

export class RemoveAllPlaylistMusicPLaylers implements Action {
  readonly type = MusicPlaylerActionTypes.RemoveAllPlaylistMusicPLaylers;
}
// Playsongs
export class SavePlaysongsMusicPlayer implements Action {
  readonly type = MusicPlaylerActionTypes.SavePlaysongsMusicPlayer;
  constructor(public payload: { songId: string, songIndex: number; playlistId: string, songs: SongMusic[] }) { }
}

export class PlayPlaysongMusicPlayer implements Action {
  readonly type = MusicPlaylerActionTypes.PlayPlaysongMusicPlayer;
  constructor(public payload: { songId: string, songIndex: number }) { }
}

export class PrevPlaysongMusicPlayer implements Action {
  readonly type = MusicPlaylerActionTypes.PrevPlaysongMusicPlayer;
}

export class NextPlaysongMusicPlayer implements Action {
  readonly type = MusicPlaylerActionTypes.NextPlaysongMusicPlayer;
}

export class PlayAlbumPlaysongsMusicPlayer implements Action {
  readonly type = MusicPlaylerActionTypes.PlayAlbumPlaysongsMusicPlayer;
  constructor(public payload: { albumId: string }) { }
}

export class PlayAllDefaultSongsMuicPlayer implements Action {
  readonly type = MusicPlaylerActionTypes.PlayAllDefaultSongsMuicPlayer;
}

export class NoActionMusicPlayer implements Action {
  readonly type = MusicPlaylerActionTypes.NoActionMusicPlayer;
}


export type MusicPlaylerActions =
  LoadDefaultPlaylistMusicPLaylers |
  SaveDefaultPlaylistMusicPLaylers |
  LoadDefaultSongsMusicPlayers |
  SaveDefaultSongsMusicPlayers |
  AddDefaultSongMusicPlayers |
  RemoveDefaultSongMusicPlayers |
  RemoveAllDefaultSongMusicplayer |
  LoadPlaylistsMusicPlaylers |
  SavePlaylistsMusicPLaylers |
  SavePlaylistMusicPLaylers |
  AddPlaylistMusicPLaylers |
  RemovePlaylistMusicPLaylers |
  RemoveAllPlaylistMusicPLaylers |
  SavePlaysongsMusicPlayer |
  PlayPlaysongMusicPlayer |
  PrevPlaysongMusicPlayer |
  NextPlaysongMusicPlayer |
  PlayAlbumPlaysongsMusicPlayer |
  PlayAllDefaultSongsMuicPlayer |
  NoActionMusicPlayer;
