import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
// Rxjs
import { Subscription } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { LoadPlaylistsMusicPlaylers, LoadDefaultPlaylistMusicPLaylers, PrevPlaysongMusicPlayer, NextPlaysongMusicPlayer } from 'src/app/user-main/state/music-player/music-playler.actions';
import { LoadDefaultSongsMusicPlayers } from './../../../../user-main/state/music-player/music-playler.actions';
import { selectPlaysongMusicPlayer } from 'src/app/user-main/state/music-player/music-player.selectors';
// Component
import { PlayListBoxComponent } from './../play-list-box/play-list-box.component';
// Interface
import { SongMusic } from 'src/app/features/music/core/interface/song-music.interface';
// Service
import { MusicService } from './../../services/music.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit {
  @ViewChild('hostViewPlayList', { read: ViewContainerRef }) hostViewPlayList: ViewContainerRef;
  playSong: SongMusic;
  isActivePlayList = false;
  closeSub$: Subscription;
  // Player remote
  player = new Audio();
  playerBinded = false;
  playerPlayed = false;
  durationTimePlayer: number;
  nameSongPlayer: string;
  userNameSongPlayer: string;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store$: Store<AppState>,
    private musicSerivce: MusicService
  ) { }

  ngOnInit() {
    this.store$.dispatch(new LoadDefaultPlaylistMusicPLaylers());
    this.store$.dispatch(new LoadPlaylistsMusicPlaylers());
    this.store$.dispatch(new LoadDefaultSongsMusicPlayers());
    this.store$.pipe(select(selectPlaysongMusicPlayer)).subscribe(song => {
      if (song === null) {
        return;
      } else if (song === undefined) {
        this.resetPlayer();
      } else {
        this.loadSong(song);
      }
    });
  }
  /*
  @ Click event toggle isActivePlayList var
  */
  onClickToggleActivePlayList() {
    if (this.isActivePlayList) {
      this.isActivePlayList = false;
      this.hostViewPlayList.clear();
    } else {
      this.isActivePlayList = true;
      this.openPlayList();
    }
  }
  /*
  @ Open playlist
  */
  openPlayList() {
    const chatBoxCmpFactory = this.componentFactoryResolver.resolveComponentFactory(PlayListBoxComponent);
    this.hostViewPlayList.clear();
    const componentRef: ComponentRef<PlayListBoxComponent> = this.hostViewPlayList.createComponent(chatBoxCmpFactory);
    this.closeSub$ = componentRef.instance.close.subscribe(
      (userId) => {
        this.hostViewPlayList.clear();
        this.isActivePlayList = false;
        this.closeSub$.unsubscribe();
      }
    );
  }
  /*
  @ Load song for player
  */
  loadSong(song: SongMusic) {
    this.player.src = song.url;
    this.playerBinded = true;
    this.durationTimePlayer = this.player.duration;
    this.nameSongPlayer = song.name;
    this.userNameSongPlayer = song.userInfo === null ? null : song.userInfo.fullName;
    this.resetPlayPlayerNewSong()
    this.musicSerivce.listenSong(song.id).subscribe();
    this.player.ontimeupdate = () => {
      if (this.player.ended) {
        this.nextSong();
      } else {
        return;
      }
    }
  }
  /*
  @ Play player
  */
  playPlayer() {
    this.player.play();
    this.playerPlayed = true;
  }
  /*
  @ Pause player
  */
  pausePlayer() {
    this.player.pause();
    this.playerPlayed = false;
  }
  /*
  @ Toggle ply player
  */
  togglePlayPlayer() {
    if (!this.playerBinded) { return };
    if (this.playerPlayed) {
      this.pausePlayer();
    } else {
      this.playPlayer();
    }
  }
  /*
  @ Reset play player no new song
  */
  resetPlayPlayerNoNewSong() {
    this.playerPlayed = false;
    this.player.currentTime = 0;
    this.player.pause();
  }
  /*
  @ Reset play player new song
  */
  resetPlayPlayerNewSong() {
    this.playerPlayed = true;
    this.player.currentTime = 0;
    this.player.load();
    this.player.play();
  }
  /*
  @ Reset player
  */
  resetPlayer() {
    this.player.src = '';
    this.playerBinded = false;
    this.playerPlayed = false;
    this.durationTimePlayer = 0;
    this.nameSongPlayer = null;
    this.userNameSongPlayer = null;
  }
  /*
  @ Toggle mute
  */
  toggleMute() {
    this.player.muted = !this.player.muted;
  }
  /*
  @ Prev song
  */
  prevSong() {
    this.store$.dispatch(new PrevPlaysongMusicPlayer());
  }
  /*
  @ Next song
  */
  nextSong() {
    this.store$.dispatch(new NextPlaysongMusicPlayer());
  }
}
