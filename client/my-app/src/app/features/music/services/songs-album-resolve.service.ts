import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MusicService } from './music.service';
import { Observable } from 'rxjs';
import { DetailAlbumMusic } from '../core/interface/detail-album-music.interface';
import { SongMusic } from '../core/interface/song-music.interface';

@Injectable({
  providedIn: 'root'
})
export class SongsAlbumResolveService implements Resolve<any> {

  constructor(
    private musicService: MusicService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<SongMusic[]> {
    return this.musicService.getSongOfAlbum(route.paramMap.get('id'));
  }
}
