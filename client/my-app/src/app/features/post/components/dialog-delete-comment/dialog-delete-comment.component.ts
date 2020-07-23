import { Component, OnInit, Inject } from '@angular/core';
// Rxjs
import { mergeMap } from 'rxjs/operators';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
import { MatSnackBar } from '@angular/material/snack-bar';
// Service
import { PostService } from './../../services/post.service';
// Store
import { AppState } from 'src/app/core/state';
import { DeleteComment } from './../../state/post.actions';
import { Store, select } from '@ngrx/store';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';

@Component({
  selector: 'app-dialog-delete-comment',
  templateUrl: './dialog-delete-comment.component.html',
  styleUrls: ['./dialog-delete-comment.component.scss']
})
export class DialogDeleteCommentComponent implements OnInit {
  loading = false;
  textMainBtn = 'Xóa';
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public commentId: string,
    private _snackBar: MatSnackBar,
    private postSerivce: PostService,
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
  }
  /*
  @ Close dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Delete comment
  */
  onDeleteComment() {
    this.loading = true;
    this.store$.pipe(select(selectUserId))
      .pipe(
        mergeMap(userId => this.postSerivce.deleteComment(userId, this.commentId))
      )
      .subscribe(res => {
        this.loading = false;
        if (res) {
          this.store$.dispatch(new DeleteComment({ commentId: this.commentId }));
          this.openSnackBar('Đã xóa bình luận');
          this.onNoClick();
        } else {
          this.textMainBtn = 'Thử lại';
        }
      })
  }
  /*
  @ Open snackbar
  */
  openSnackBar(message: string, action: string = null) {
    this._snackBar.open(message, action, snackBarConfig);
  }
}
