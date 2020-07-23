import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectTopAlbumsMusic, selectTopAlbumsLoadedMusic } from '../../state/music.selectors';
import { LoadTopAlbums } from './../../state/music.actions';
// Interface
import { AlbumMusic } from '../../core/interface/album-music.interface';

@Component({
  selector: 'app-top-album-music',
  templateUrl: './top-album-music.component.html',
  styleUrls: ['./top-album-music.component.scss']
})
export class TopAlbumMusicComponent implements OnInit {
  topAlbums$: Observable<AlbumMusic[]>;
  loaded$: Observable<boolean>;
  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(new LoadTopAlbums());
    this.topAlbums$ = this.store$.pipe(select(selectTopAlbumsMusic));
    this.loaded$ = this.store$.pipe(select(selectTopAlbumsLoadedMusic));
  }
}
