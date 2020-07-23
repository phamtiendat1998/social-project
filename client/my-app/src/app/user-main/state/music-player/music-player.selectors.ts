import { filter } from 'rxjs/operators';
import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMusicPlayer from './music-player.reducer';

export const selectMusicPlayerState = createFeatureSelector<fromMusicPlayer.MusicPlayerState>('musicPlayer');
export const selectPlaylistMusicPlayerState = createSelector(selectMusicPlayerState, (state: fromMusicPlayer.MusicPlayerState) => state.playlists);
export const selectDefaultSongsMusicPlayerState = createSelector(selectMusicPlayerState, (state: fromMusicPlayer.MusicPlayerState) => state.defaultSongs);
export const selectPlaysongMusicPlayerState = createSelector(selectMusicPlayerState, (state: fromMusicPlayer.MusicPlayerState) => state.playsongs);

// Playlist
export const selectPlaylistsMusicPlayer = createSelector(
    selectPlaylistMusicPlayerState,
    fromMusicPlayer.selectAllPLaylists
);

export const selectPlaylistsNoDefaultMusicPlayer = createSelector(
    selectPlaylistsMusicPlayer,
    playlists => playlists.filter(playlist => playlist.id !== 'default')
);

export const selectPlaylistIdsMusicPlayer = createSelector(
    selectPlaylistMusicPlayerState,
    state => state.ids
)
export const selectIsAddPlaylistMusicPlayer = createSelector(
    selectPlaylistIdsMusicPlayer,
    (state, props) => {
        if (state.indexOf(props.id) !== -1) {
            return true;
        } else {
            return false;
        }
    }
)

// Default songs
export const selectSongsDefaultIdsMusicPlayer = createSelector(
    selectDefaultSongsMusicPlayerState,
    state => state.ids
)

export const selectDefaultSongsMusicPlayer = createSelector(
    selectDefaultSongsMusicPlayerState,
    fromMusicPlayer.selectAllDefaultSongs
)

export const selectIsAddSongDefaultSongsMusicPlayer = createSelector(
    selectSongsDefaultIdsMusicPlayer,
    (state, props) => {
        if (state.indexOf(props.id) !== -1) {
            return true;
        } else {
            return false;
        }
    }
)

// Playsongs
export const selectPlaysongsMusicPlayer = createSelector(
    selectPlaysongMusicPlayerState,
    fromMusicPlayer.selectAllPlaysongs
)

export const selectPlaylistIdPlaySongsMusicPlayer = createSelector(
    selectPlaysongMusicPlayerState,
    state => state.playlistId
)

export const selectSelectedSongIdPlaySongsMusicPlayer = createSelector(
    selectPlaysongMusicPlayerState,
    state => state.selectedSongId
)

// Song to play
export const selectPlaysongMusicPlayer = createSelector(
    selectDefaultSongsMusicPlayerState,
    selectPlaysongMusicPlayerState,
    (defaultSongsState, playsongsState) => {
        if (playsongsState.playlistId === null) {
            return null;
        } else if (playsongsState.playlistId === 'default') {
            return defaultSongsState.entities[playsongsState.selectedSongId];
        } else {
            return playsongsState.entities[playsongsState.selectedSongId];
        }
    }
)
export const selectIsPlayingSongMusicPlayer = createSelector(
    selectPlaysongMusicPlayerState,
    (state, props) => {
        if (state.selectedSongId === props.id && state.playlistId === props.playlistId) {
            return true
        } else {
            return false;
        }
    }
)