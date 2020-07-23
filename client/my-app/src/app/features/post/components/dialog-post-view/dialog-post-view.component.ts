import { selectPost, selectQuantityInteractivePost, selectCommentsOfPost } from './../../state/post.selectors';
import { Component, OnInit, Inject } from '@angular/core';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogLikedUserPostComponent } from '../dialog-liked-user-post/dialog-liked-user-post.component';
// Rxjs
import { Observable, Subscription } from 'rxjs';
// Interface
import { DialogPostViewData } from '../../core/interface/dialog-post-view-data.interface';
import { Media } from './../../core/interface/media.interface';
import { FullPost } from '../../core/interface/post/full-post.interface';
import { QuantityInteractivePost } from '../../core/interface/post/quantity-interactive-post.interface';
import { PagingHeader } from 'src/app/shared/core/interface/header.interface';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { AddComments, LikePost, DislikePost } from '../../state/post.actions';
// Service
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-dialog-post-view',
  templateUrl: './dialog-post-view.component.html',
  styleUrls: ['./dialog-post-view.component.scss']
})
export class DialogPostViewComponent implements OnInit {
  post$: Observable<FullPost>;
  quantityInteractivePost$: Observable<QuantityInteractivePost>;
  subComments$: Subscription;
  commentIds$: Observable<string[]>;
  headerComments: PagingHeader = null;
  isOpenComment = false;
  loadingComment = false;
  mediaShown: Media;
  mediaIndex: number;
  constructor(
    public dialogRef: MatDialogRef<DialogPostViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogPostViewData,
    public dialog: MatDialog,
    private store$: Store<AppState>,
    private postService: PostService,
  ) {
    this.mediaIndex = this.data.mediaIndex;
  }

  ngOnInit(): void {
    this.post$ = this.store$.pipe(select(selectPost, { id: this.data.postId }));
    this.quantityInteractivePost$ = this.store$.pipe(select(selectQuantityInteractivePost, { id: this.data.postId }));
  }
  /*
  @ Event close dialog
  @ Close output: like, comment of post if its changed
  */
  onClickCloseDialog(): void {
    this.dialogRef.close();
  }
  /*
  @ Event next media
  */
  onClickNextMedia() {
    this.mediaIndex++;
  }
  /*
   @ Event prev media
   */
  onClickPrevMedia() {
    this.mediaIndex--;
  }
  /*
  @ Event like post
  */
  onClickLikePost() {
    this.store$.dispatch(new LikePost({ postId: this.data.postId }));
  }
  /*
  @ Event dislike post
  */
  onClickDislikePost() {
    this.store$.dispatch(new DislikePost({ postId: this.data.postId }));
  }
  /*
  @ Open dialog like user post
  */
  onClickOpenDialogLikedUser() {
    this.dialog.open(DialogLikedUserPostComponent, {
      width: '540px',
      data: this.data.postId
    });
  }
  /*
 @ Event open comment
 */
  onClickOpenComment() {
    if (!this.isOpenComment) {
      this.isOpenComment = true;
      this.commentIds$ = this.store$.pipe(select(selectCommentsOfPost, { id: this.data.postId }));
      this.getCommentConnectApi();
    }
  }
  /*
  @ Event open more comment
  */
  onClickGetMoreComment() {
    this.getCommentConnectApi();
  }
  /*
  @ Get comment connect api
  */
  getCommentConnectApi() {
    this.loadingComment = true;
    this.subComments$ = this.postService.getComment(this.headerComments, this.data.postId).subscribe(res => {
      this.loadingComment = false;
      this.headerComments = res.header;
      this.store$.dispatch(new AddComments({ postId: this.data.postId, comments: res.data }));
    });
  }
}
