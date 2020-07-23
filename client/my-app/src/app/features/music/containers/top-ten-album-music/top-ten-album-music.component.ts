import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Interface
import { AlbumMusic } from '../../core/interface/album-music.interface';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { LoadTopAlbums } from '../../state/music.actions';
import { selectTopAlbumsMusic, selectTopAlbumsLoadedMusic } from '../../state/music.selectors';

@Component({
  selector: 'app-top-ten-album-music',
  templateUrl: './top-ten-album-music.component.html',
  styleUrls: ['./top-ten-album-music.component.scss']
})
export class TopTenAlbumMusicComponent implements OnInit {
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
