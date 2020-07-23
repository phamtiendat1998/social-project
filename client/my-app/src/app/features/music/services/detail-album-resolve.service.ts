import { MusicService } from './music.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DetailAlbumMusic } from '../core/interface/detail-album-music.interface';

@Injectable({
  providedIn: 'root'
})
export class DetailAlbumResolveService implements Resolve<any> {

  constructor(
    private musicService: MusicService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<DetailAlbumMusic> {
    return this.musicService.getDetailAlbumMusic(route.paramMap.get('id'));
  }
}
