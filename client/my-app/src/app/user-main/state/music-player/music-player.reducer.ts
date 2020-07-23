import { MusicPlaylerActions, MusicPlaylerActionTypes } from './music-playler.actions';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { PlaylistPlayerMusic } from 'src/app/features/music/core/interface/playlist-player-music.interface';
import { SongMusic } from 'src/app/features/music/core/interface/song-music.interface';
import { act } from '@ngrx/effects';

export const musicPlayerFeatureKey = 'musicPlayer';

export interface MusicPlayerState {
  playlists: PlaylistMusicPlayerState;
  defaultSongs: SongsDefaultState;
  playsongs: PlaySongMusicPlayerState;
}

export interface PlaylistMusicPlayerState extends EntityState<PlaylistPlayerMusic> {
}

export interface SongsDefaultState extends EntityState<SongMusic> {

}
export interface PlaySongMusicPlayerState extends EntityState<SongMusic> {
  playlistId: string | null;
  selectedSongId: string | number | null;
  selectedSongIndex: number | null;
}


export const adapterPlaylistMusicPlayer: EntityAdapter<PlaylistPlayerMusic> = createEntityAdapter<PlaylistPlayerMusic>();

export const adapterPlaysongMusicPlayer: EntityAdapter<SongMusic> = createEntityAdapter<SongMusic>();

export const adaperDefaultSongs: EntityAdapter<SongMusic> = createEntityAdapter<SongMusic>();

export const initialPlaylistMusicPlayerState: PlaylistMusicPlayerState = adapterPlaylistMusicPlayer.getInitialState({
});

export const initialPlaysongMusicPlayerState: PlaySongMusicPlayerState = adapterPlaysongMusicPlayer.getInitialState({
  playlistId: null,
  selectedSongId: null,
  selectedSongIndex: null
});
export const initialSongsDefaultMusicPlayerState: SongsDefaultState = adaperDefaultSongs.getInitialState({
});

export const initialMusicPlayerState = {
  playlists: initialPlaylistMusicPlayerState,
  defaultSongs: initialSongsDefaultMusicPlayerState,
  playsongs: initialPlaysongMusicPlayerState
}


export function reducer(state = initialMusicPlayerState, action: MusicPlaylerActions): MusicPlayerState {
  let songsIds;
  let newIndex;
  let songId;
  switch (action.type) {
    // Playlist
    case MusicPlaylerActionTypes.SaveDefaultPlaylistMusicPLaylers:
      return { ...state, playlists: adapterPlaylistMusicPlayer.addOne(action.payload.playlist, state.playlists) };
    case MusicPlaylerActionTypes.SavePlaylistsMusicPLaylers:
      return { ...state, playlists: adapterPlaylistMusicPlayer.addMany(action.payload.playlists, state.playlists) };
    case MusicPlaylerActionTypes.SavePlaylistMusicPLaylers:
      return { ...state, playlists: adapterPlaylistMusicPlayer.addOne(action.payload.playlist, state.playlists) };
    case MusicPlaylerActionTypes.RemovePlaylistMusicPLaylers:
      return { ...state, playlists: adapterPlaylistMusicPlayer.removeOne(action.payload.albumId, state.playlists) };
    case MusicPlaylerActionTypes.RemoveAllPlaylistMusicPLaylers:
      return { ...state, playlists: adapterPlaylistMusicPlayer.removeAll({ ...state.playlists }) };
    // Default songs
    case MusicPlaylerActionTypes.SaveDefaultSongsMusicPlayers:
      return { ...state, defaultSongs: adaperDefaultSongs.addMany(action.payload.songs, state.defaultSongs) };
    case MusicPlaylerActionTypes.AddDefaultSongMusicPlayers:
      return { ...state, defaultSongs: adaperDefaultSongs.addOne(action.payload.song, state.defaultSongs) };
    case MusicPlaylerActionTypes.RemoveDefaultSongMusicPlayers:
      return { ...state, defaultSongs: adaperDefaultSongs.removeOne(action.payload.songId, state.defaultSongs) };
    case MusicPlaylerActionTypes.RemoveAllDefaultSongMusicplayer:
      return { ...state, defaultSongs: adaperDefaultSongs.removeAll({ ...state.defaultSongs }) };
    // Playsongs
    case MusicPlaylerActionTypes.SavePlaysongsMusicPlayer:
      return {
        ...state,
        playsongs: adapterPlaysongMusicPlayer.setAll(
          action.payload.songs,
          {
            ...state.playsongs,
            playlistId: action.payload.playlistId,
            selectedSongId: action.payload.songId,
            selectedSongIndex: action.payload.songIndex,
          }
        )
      };
    case MusicPlaylerActionTypes.PlayPlaysongMusicPlayer:
      return {
        ...state,
        playsongs: {
          ...state.playsongs,
          selectedSongId: action.payload.songId,
          selectedSongIndex: action.payload.songIndex,
        }
      }
    case MusicPlaylerActionTypes.PrevPlaysongMusicPlayer:
      songsIds = state.playsongs.playlistId === 'default' ? state.defaultSongs.ids : state.playsongs.ids;
      newIndex = state.playsongs.selectedSongIndex > 0 ? state.playsongs.selectedSongIndex - 1 : songsIds.length - 1;
      songId = state.playsongs.playlistId === 'default' ? state.defaultSongs.ids[newIndex] : state.playsongs.ids[newIndex];
      return {
        ...state,
        playsongs: {
          ...state.playsongs,
          selectedSongIndex: newIndex,
          selectedSongId: songId
        }
      }
    case MusicPlaylerActionTypes.NextPlaysongMusicPlayer:
      songsIds = state.playsongs.playlistId === 'default' ? state.defaultSongs.ids : state.playsongs.ids;
      newIndex = state.playsongs.selectedSongIndex < songsIds.length - 1 ? state.playsongs.selectedSongIndex + 1 : 0;
      songId = state.playsongs.playlistId === 'default' ? state.defaultSongs.ids[newIndex] : state.playsongs.ids[newIndex];
      return {
        ...state,
        playsongs: {
          ...state.playsongs,
          selectedSongIndex: newIndex,
          selectedSongId: songId
        }
      }
    case MusicPlaylerActionTypes.PlayAllDefaultSongsMuicPlayer:
      return {
        ...state,
        playsongs: {
          ...state.playsongs,
          playlistId: 'default',
          selectedSongIndex: 0,
          selectedSongId: state.defaultSongs.ids[0]
        }
      }
    default:
      return state;
  }
}

export const { selectAll: selectAllPLaylists } = adapterPlaylistMusicPlayer.getSelectors();
export const { selectAll: selectAllDefaultSongs } = adaperDefaultSongs.getSelectors();
export const { selectAll: selectAllPlaysongs } = adapterPlaysongMusicPlayer.getSelectors();