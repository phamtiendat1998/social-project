import { Component, OnInit, Inject } from '@angular/core';
// Rxjs
import { Subscription } from 'rxjs';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { RemoveUserSong } from '../../state/music.actions';
// Service
import { MusicService } from '../../services/music.service';


@Component({
  selector: 'app-dialog-delete-song-of-album-music',
  templateUrl: './dialog-delete-song-of-album-music.component.html',
  styleUrls: ['./dialog-delete-song-of-album-music.component.scss']
})
export class DialogDeleteSongOfAlbumMusicComponent implements OnInit {
  subUserId$: Subscription;
  userId: string;
  loading = false;
  textAcceptBtn = 'Xóa';
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteSongOfAlbumMusicComponent>,
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
          this.dialogRef.close(this.songId);
        } else {
          this.loading = false;
          this.textAcceptBtn = 'Thử lại';
        }
      }
    )
  }
}
