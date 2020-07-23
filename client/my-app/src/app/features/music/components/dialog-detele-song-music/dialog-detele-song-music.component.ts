import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
// Rxjs
import { Subscription } from 'rxjs';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { RemoveUserSong } from './../../state/music.actions';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Service
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-dialog-detele-song-music',
  templateUrl: './dialog-detele-song-music.component.html',
  styleUrls: ['./dialog-detele-song-music.component.scss']
})
export class DialogDeteleSongMusicComponent implements OnInit, OnDestroy {
  subUserId$: Subscription;
  userId: string;
  loading = false;
  textAcceptBtn = 'Xóa';
  constructor(
    public dialogRef: MatDialogRef<DialogDeteleSongMusicComponent>,
    @Inject(MAT_DIALOG_DATA) public songId: string | null,
    private store$: Store<AppState>,
    private musicServive: MusicService
  ) { }

  ngOnInit(): void {
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
  }
  /*
  @ Clase dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Remove song
  */
  removeSong() {
    this.loading = true;
    this.musicServive.deleteSong(this.userId, this.songId).subscribe(
      res => {
        if (res) {
          this.store$.dispatch(new RemoveUserSong({ songId: this.songId }));
          this.onNoClick();
        } else {
          this.loading = false;
          this.textAcceptBtn = 'Thử lại';
        }
      }
    )
  }
}
