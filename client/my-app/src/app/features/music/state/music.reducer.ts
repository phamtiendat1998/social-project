import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { SongMusic } from '../core/interface/song-music.interface';
import { MusicActionTypes, MusicActions, LoadTopSongs } from './music.actions';
import { AlbumMusic } from '../core/interface/album-music.interface';


export const musicFeatureKey = 'music';

export interface TopSongsState extends EntityState<SongMusic> {
  songsLoaded: boolean;
}

export interface TopAlbumsState extends EntityState<AlbumMusic> {
  albumsLoaded: boolean;
}

export interface UserSongsState extends EntityState<SongMusic> {
  songsLoaded: boolean;
  songUploaded: boolean;
}

export interface UserAlbumsState extends EntityState<AlbumMusic> {
  albumUploadding: boolean;
}
export interface MusicState {
  topSongs: TopSongsState;
  topAlbums: TopAlbumsState;
  userSongs: UserSongsState;
  userAlbums: UserAlbumsState;
}

export const adapterTopSongs: EntityAdapter<SongMusic> = createEntityAdapter<SongMusic>();
export const adapterTopAlbums: EntityAdapter<AlbumMusic> = createEntityAdapter<AlbumMusic>();
export const adapterUserSongs: EntityAdapter<SongMusic> = createEntityAdapter<SongMusic>();
export const adapterUserAlbums: EntityAdapter<AlbumMusic> = createEntityAdapter<AlbumMusic>();

export const initialTopSongsState: TopSongsState = adapterTopSongs.getInitialState({
  songsLoaded: false
});

export const initialTopAlbumsState: TopAlbumsState = adapterTopAlbums.getInitialState({
  albumsLoaded: false
});

export const initialUserSongsState: UserSongsState = adapterUserSongs.getInitialState({
  songsLoaded: false,
  songUploaded: false,
});

export const initialUserAlbumsState: UserAlbumsState = adapterUserAlbums.getInitialState({
  albumUploadding: false,
});

export const initialMusicState: MusicState = {
  userSongs: initialUserSongsState,
  topSongs: initialTopSongsState,
  topAlbums: initialTopAlbumsState,
  userAlbums: initialUserAlbumsState,
};

export function reducer(state = initialMusicState, action: MusicActions): MusicState {
  switch (action.type) {
    // Top songs
    case MusicActionTypes.LoadTopSongs:
      return { ...state, topSongs: { ...state.topSongs, songsLoaded: false } };
    case MusicActionTypes.SaveTopSongs:
      return { ...state, topSongs: adapterTopSongs.addAll(action.payload.songs, { ...state.topSongs, songsLoaded: true }) };
    // Top albums
    case MusicActionTypes.LoadTopAlbums:
      return { ...state, topAlbums: { ...state.topAlbums, albumsLoaded: false } };
    case MusicActionTypes.SaveTopAlbums:
      return { ...state, topAlbums: adapterTopAlbums.addAll(action.payload.albums, { ...state.topAlbums, albumsLoaded: true }) };
    // User songs
    case MusicActionTypes.LoadUserSongs:
      return { ...state, userSongs: { ...state.userSongs, songsLoaded: false } };
    case MusicActionTypes.SaveUserSongs:
      return {
        ...state,
        userSongs: adapterUserSongs.addMany(action.payload.songs, { ...state.userSongs, songsLoaded: true })
      };
    case MusicActionTypes.AddUserSong:
      return { ...state, userSongs: adapterUserSongs.addOne(action.payload.song, state.userSongs) };
    case MusicActionTypes.RemoveUserSong:
      return { ...state, userSongs: adapterUserSongs.removeOne(action.payload.songId, state.userSongs) };
    // User albums
    case MusicActionTypes.SaveUserAlbums:
      return { ...state, userAlbums: adapterUserAlbums.addAll(action.payload.albums, state.userAlbums) };
    case MusicActionTypes.AddUserAlbum:
      return { ...state, userAlbums: adapterUserAlbums.addOne(action.payload.album, state.userAlbums) };
    case MusicActionTypes.RemoveUserAlbum:
      return { ...state, userAlbums: adapterUserAlbums.removeOne(action.payload.albumId, state.userAlbums) };
    default:
      return state;
  }
}


export const { selectAll: selectAllTopSongs } = adapterTopSongs.getSelectors();
export const { selectAll: selectAllTopAlbums } = adapterTopAlbums.getSelectors();
export const { selectAll: selectAllUserSongs } = adapterUserSongs.getSelectors();
export const { selectAll: selectAllUserAlbums } = adapterUserAlbums.getSelectors();
