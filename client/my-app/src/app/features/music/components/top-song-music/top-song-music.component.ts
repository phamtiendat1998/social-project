import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { LoadTopSongs } from './../../state/music.actions';
import { selectTopSongsMusic, selectTopSongsLoadedMusic } from '../../state/music.selectors';
// Interface
import { TopSongMusic } from '../../core/interface/top-song-music.interface';

@Component({
  selector: 'app-top-song-music',
  templateUrl: './top-song-music.component.html',
  styleUrls: ['./top-song-music.component.scss']
})
export class TopSongMusicComponent implements OnInit {
  topSong$: Observable<TopSongMusic[]>;
  loaded$: Observable<boolean>;
  constructor(
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(new LoadTopSongs());
    this.topSong$ = this.store$.pipe(select(selectTopSongsMusic));
    this.loaded$ = this.store$.pipe(select(selectTopSongsLoadedMusic));
  }

}
