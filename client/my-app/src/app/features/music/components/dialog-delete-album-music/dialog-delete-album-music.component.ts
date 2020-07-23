import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
// Rxjs
import { Observable, Subscription } from 'rxjs';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Service
import { MusicService } from './../../services/music.service';
import { RemoveUserAlbum } from '../../state/music.actions';

@Component({
  selector: 'app-dialog-delete-album-music',
  templateUrl: './dialog-delete-album-music.component.html',
  styleUrls: ['./dialog-delete-album-music.component.scss']
})
export class DialogDeleteAlbumMusicComponent implements OnInit, OnDestroy {
  subUserId$: Subscription;
  userId: string;
  loading = false;
  textAcceptBtn = 'Xóa';
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteAlbumMusicComponent>,
    @Inject(MAT_DIALOG_DATA) public albumId: string | null,
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
  removeAlbum() {
    this.loading = true;
    this.musicServive.deleteAlbum(this.userId, this.albumId).subscribe(
      res => {
        if (res) {
          this.store$.dispatch(new RemoveUserAlbum({ albumId: this.albumId }));
          this.onNoClick();
        } else {
          this.loading = false;
          this.textAcceptBtn = 'Thử lại';
        }
      }
    )
  }
}
