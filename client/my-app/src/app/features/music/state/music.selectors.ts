import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMusic from './music.reducer';

export const selectMusicState = createFeatureSelector<fromMusic.MusicState>('music');
export const selectTopSongsState = createSelector(selectMusicState, (state: fromMusic.MusicState) => state.topSongs);
export const selectTopAlbumsState = createSelector(selectMusicState, (state: fromMusic.MusicState) => state.topAlbums);
export const selectUserSongsState = createSelector(selectMusicState, (state: fromMusic.MusicState) => state.userSongs);
export const selectUserAlbumsState = createSelector(selectMusicState, (state: fromMusic.MusicState) => state.userAlbums);

// Top sóng
export const selectTopSongsMusic = createSelector(
    selectTopSongsState,
    fromMusic.selectAllTopSongs
)

export const selectTopSongsLoadedMusic = createSelector(
    selectTopSongsState,
    state => state.songsLoaded
)

// Top Album
export const selectTopAlbumsMusic = createSelector(
    selectTopAlbumsState,
    fromMusic.selectAllTopAlbums
)
export const selectTopAlbumsLoadedMusic = createSelector(
    selectTopAlbumsState,
    state => state.albumsLoaded
)

// User song
export const selectUserSongsMusic = createSelector(
    selectUserSongsState,
    fromMusic.selectAllUserSongs
)
export const selectUserSongUploadedMusic = createSelector(
    selectUserSongsState,
    state => state.songUploaded
)

// User album
export const selectUserAlbumsMusic = createSelector(
    selectUserAlbumsState,
    fromMusic.selectAllUserAlbums
)
export const selectUserAlbumUploaddingMusic = createSelector(
    selectUserAlbumsState,
    state => state.albumUploadding
)