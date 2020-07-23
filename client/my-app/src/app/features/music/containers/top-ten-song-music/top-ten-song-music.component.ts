import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Interface
import { TopSongMusic } from '../../core/interface/top-song-music.interface';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { LoadTopSongs } from '../../state/music.actions';
import { selectTopSongsMusic, selectTopSongsLoadedMusic } from '../../state/music.selectors';

@Component({
  selector: 'app-top-ten-song-music',
  templateUrl: './top-ten-song-music.component.html',
  styleUrls: ['./top-ten-song-music.component.scss']
})
export class TopTenSongMusicComponent implements OnInit {
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
