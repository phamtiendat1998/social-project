import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
// Interface
import { ResponseData } from './../../../shared/core/interface/response-data.interface';
import { SongMusic } from '../core/interface/song-music.interface';
import { AlbumMusic } from '../core/interface/album-music.interface';
import { DetailAlbumMusic } from '../core/interface/detail-album-music.interface';
// Key
import { domain } from './../../../shared/core/key/domain';
// Helper
import { calcTimeMusic } from 'src/app/shared/core/helper/calc-time-music';
import { getProfileUserLink } from 'src/app/shared/core/helper/get-profile-user-link';
import { jsonMedia, jsonMedias } from 'src/app/shared/core/helper/json-media';


@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private userId: string;
  private getTopSongApi = domain + '/api/usermedia/getchartmusictopten';
  private getTopAlbumApi = domain + '/api/usermedia/getchartalbummusictopten';
  private getSongOfAlbumApi = domain + '/api/usermedia/getmusics';
  private uploadSongApi = domain + '/api/usermedia/uploadmusic';
  private createAlbumApi = domain + '/api/usermedia/createalbummusic';
  private getAlbumApi = domain + '/api/usermedia/getalbummusics';
  private deleteSongApi = domain + '/api/usermedia/deleteitemmusic';
  private deleteAlbumApi  = domain + '/api/usermedia/deletealbummusic';
  private listenSongApi = domain + '/api/usermedia/addquantitylistenorviewmedia';
  private getDetailAlbumApi = domain + '/api/usermedia/getdetailalbum';
  private editAlbumApi = domain + '/api/usermedia/updatealbummusic';

  constructor(
    private httpClient: HttpClient
  ) { }
  /*
  @ Get top song in trend
  */
  getTopSong(): Observable<SongMusic[]> {
    return this.httpClient.get<ResponseData>(`${this.getTopSongApi}`)
      .pipe(
        delay(500),
        map(
          res => {
            return res.Data.map(item => {
              const song: SongMusic = {
                id: item.IdMusic,
                name: item.MusicName,
                totalTime: item.Time,
                time: calcTimeMusic(item.Time),
                url: item.LinkUrl,
                cover: item.Covers,
                userInfo: {
                  userId: item.UserInfo.IdUser,
                  firstName: item.UserInfo.FirstName,
                  lastName: item.UserInfo.LastName,
                  fullName: item.UserInfo.FirstName + ' ' + item.UserInfo.LastName,
                  avatar: item.UserInfo.Avatar,
                  link: getProfileUserLink(),
                },
              }
              return song;
            })
          }
        )
      )
  }
  /*
  @ Get top album in trend
  */
  getTopAlbum(): Observable<AlbumMusic[]> {
    return this.httpClient.get<ResponseData>(`${this.getTopAlbumApi}`)
      .pipe(
        delay(500),
        map(
          res => {
            return res.Data.map(item => {
              const album: AlbumMusic = {
                id: item.IdAlbumMusic,
                name: item.AlbumMusicName,
                cover: item.Covers,
                quantitySong: item.Quantity,
                userInfo: {
                  userId: item.UserInfo.IdUser,
                  firstName: item.UserInfo.FirstName,
                  lastName: item.UserInfo.LastName,
                  fullName: item.UserInfo.FirstName + ' ' + item.UserInfo.LastName,
                  avatar: item.UserInfo.Avatar,
                  link: getProfileUserLink(),
                }
              }
              return album;
            })
          }
        )
      )
  }
  /*
  @ Get song of album for playlist
  @ Input: album id
  */
  getSongOfAlbum(albumId: string): Observable<SongMusic[]> {
    return this.httpClient.get<ResponseData>(`${this.getSongOfAlbumApi}?idAlbum=${albumId}`)
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data !== null && res.Data.length !== 0) {
              const songs = res.Data.map(song => {
                const mappedSong: SongMusic = {
                  id: song.IdMusic,
                  name: song.MusicName,
                  totalTime: song.Time,
                  time: calcTimeMusic(song.Time),
                  url: song.LinkUrl,
                  cover: song.Covers ? song.Covers[0] : null,
                  userInfo: null,
                }
                return mappedSong;
              });
              return songs;
            } else {
              return null
            }
          }
        )
      )
  }
  /*
  @ Get songs of user
  */
  getUserSongs(userId: string): Observable<SongMusic[]> {
    return this.httpClient.get<ResponseData>(`${this.getSongOfAlbumApi}?idAlbum=${''}&idUser=${userId}`)
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data !== null && res.Data.length !== 0) {
              const songs = res.Data.map(song => {
                const mappedSong: SongMusic = {
                  id: song.IdMusic,
                  name: song.MusicName,
                  totalTime: song.Time,
                  time: calcTimeMusic(song.Time),
                  url: song.LinkUrl,
                  cover: song.Covers ? song.Covers[0] : null,
                  userInfo: null,
                }
                return mappedSong;
              });
              return songs;
            } else {
              return null
            }
          }
        )
      )
  }
  /*
  @ Upload song into album
  */
  uploadSong(
    userId: string,
    albumId: string,
    base64Song: string,
    cover: string,
    songName: string,
    time: string
  ): Observable<any> {
    return this.httpClient.post<ResponseData>(`${this.uploadSongApi}`, {
      IdUser: userId,
      IdAlbumMusic: albumId,
      Base64String: jsonMedias([base64Song]),
      Cover: cover ? jsonMedias([cover]) : null,
      MusicName: songName,
      Time: time,
    })
      .pipe(
        map(res => {
          if (res.Data == 'Upload failed') {
            return null
          } else {
            const song: SongMusic = {
              id: res.Data.IdMusic,
              url: res.Data.LinkUrl,
              name: songName,
              cover: cover,
              time: calcTimeMusic(time),
              totalTime: time,
              userInfo: null
            };
            return song;
          }
        })
      )
  }
  /*
  @ Create user album
  */
  createAlbum(userId: string, name: string, cover: string, content: string): Observable<AlbumMusic> {
    return this.httpClient.post<ResponseData>(`${this.createAlbumApi}`, {
      IdUser: userId,
      AlbumMusicName: name,
      Base64String: jsonMedia(cover),
      ContentAlbumMusic: content,
    })
      .pipe(
        map(res => {
          if (res.Data !== null || res.Data !== '') {
            const newAlbum: AlbumMusic = {
              id: res.Data,
              cover: cover,
              name: name,
              quantitySong: 0,
              userInfo: null
            };
            return newAlbum;
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Get albums
  */
  getAlbums(userId: string): Observable<AlbumMusic[]> {
    return this.httpClient.get<ResponseData>(`${this.getAlbumApi}?idUser=${userId}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            return res.Data.map(item => {
              const album: AlbumMusic = {
                id: item.IdAlbumMusic,
                name: item.AlbumMusicName,
                cover: item.Covers == null ? null : item.Covers[0],
                quantitySong: item.Quantity,
                userInfo: null
              }
              return album;
            })
          }
        })
      )
  }
  /*
  @ Delete user song
  */
  deleteSong(userId: string, songId: string): Observable<string> {
    return this.httpClient.post<ResponseData>(`${this.deleteSongApi}`, {
      IdUser: userId,
      IdMusic: songId
    })
      .pipe(
        map(res => {
          return res.Data == "Deleted item music" ? songId : null;
        })
      )
  }
  /*
  @ Delete user album
  */
  deleteAlbum(userId: string, albumId: string): Observable<string> {
    return this.httpClient.post<ResponseData>(`${this.deleteAlbumApi}`, {
      IdUser: userId,
      IdAlbumMusic: albumId
    })
      .pipe(
        map(res => {
          return res.Data == "Deleted album" ? albumId : null;
        })
      )
  }
  /*
  @ Listen song
  */
  listenSong(idSong: string): Observable<boolean> {
    return this.httpClient.get<ResponseData>(`${this.listenSongApi}?idMedia=${idSong}&type=${1}`)
      .pipe(
        map(res => {
          return res.Data ? true : false;
        })
      )
  }
  /*
  @ Get detail album
  */
  getDetailAlbumMusic(idAlbum: string): Observable<DetailAlbumMusic> {
    return this.httpClient.get<ResponseData>(`${this.getDetailAlbumApi}?idAlbum=${idAlbum}&type=${1}`)
      .pipe(
        map(res => {
          const album: DetailAlbumMusic = {
            albumId: res.Data.IdAlbumMusic,
            content: res.Data.ContentAlbumMusic,
            cover: res.Data.Covers == null ? null : res.Data.Covers[0],
            name: res.Data.AlbumMusicName,
            quantitySong: res.Data.Quantity,
            quantityTime: calcTimeMusic(res.Data.Time),
            status: 0
          };
          return album;
        })
      )
  }
  /*
  @ Edit album
  */
  editAlbum(userId: string, albumid: string, name: string, content: string, cover: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.editAlbumApi}`, {
      IdUser: userId,
      IdAlbumMusic: albumid,
      AlbumMusicName: name,
      ContentAlbumMusic: content,
      Base64String: cover !== null ? jsonMedias([cover]) : null
    })
      .pipe(
        map(
          res => {
            if (res.Data == 'updated') {
              return true;
            } else {
              return false;
            }
          }
        )
      )
  }
}
