import { selectCommentsOfComment, selectQuantityInteractiveComment } from './../../state/post.selectors';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
// Mat
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteCommentComponent } from '../dialog-delete-comment/dialog-delete-comment.component';
// Rxjs
import { Observable, Subscription } from 'rxjs';
// Service
import { PostService } from '../../services/post.service';
// Interface
import { Comment } from './../../core/interface/comment/comment.interface';
import { QuantityInteractiveComment } from '../../core/interface/comment/quantity-interactive-comment.interface';
import { PagingHeader } from 'src/app/shared/core/interface/header.interface';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { selectCommentPost } from '../../state/post.selectors';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { AddReplyComments } from '../../state/post.actions';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
export class PostCommentComponent implements OnInit, OnDestroy {
  @Input() commentId: string;
  comment$: Observable<Comment>;
  userId$: Observable<string>;
  subReplyComments$: Subscription;
  commentReplyIds$: Observable<string[]>;
  quantityInteractiveComment$: Observable<QuantityInteractiveComment>
  headerReplyComments: PagingHeader = null;
  loadingReplyComment = false;
  isOpenReplyComments = false;
  isOpenReply = false;
  isUpdateComment = false;
  constructor(
    private store$: Store<AppState>,
    public dialog: MatDialog,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.comment$ = this.store$.pipe(select(selectCommentPost, { id: this.commentId }));
    this.commentReplyIds$ = this.store$.pipe(select(selectCommentsOfComment, { id: this.commentId }));
    this.userId$ = this.store$.pipe(select(selectUserId));
    this.quantityInteractiveComment$ = this.store$.pipe(select(selectQuantityInteractiveComment, { id: this.commentId }));
  }
  ngOnDestroy() {
    if (this.isOpenReplyComments) {
      this.subReplyComments$.unsubscribe();
    }
  }
  /*
  @ Event open reply comment item
  */
  onClickOpenReplyComments() {
    if (!this.isOpenReplyComments) {
      this.isOpenReplyComments = true;
      this.getReplyCommentConnectApi();
    } else {
      return;
    }
  }
  /*
  @ Event open reply input
  */
  onClickOpenReply() {
    this.isOpenReply = true;
  }
  /*
  @ Event like comment
  */
  onClickLikeComment() {
    // if (this.comment.Liked) {
    //   this.comment.Liked = false;
    //   this.comment.QuantityLike--;
    // } else {
    //   this.comment.Liked = true;
    //   this.comment.QuantityLike++;
    // }
  }
  /*
  @ Open dialog delete comment
  */
  onClickOpenDialogDeleteComment() {
    this.dialog.open(DialogDeleteCommentComponent, {
      width: '540px',
      data: this.commentId
    });
  }
  /*
  @ Update comment
  */
  onUpdateComment() {
    this.isUpdateComment = true;
  }
  /*
  @ Close update comment
  */
  onCloseUpdateComment() {
    this.isUpdateComment = false;
  }
  /*
  @ Get reply comment connect api
  */
  getReplyCommentConnectApi() {
    this.loadingReplyComment = true;
    this.subReplyComments$ = this.postService.getReplyComments(this.headerReplyComments, this.commentId).subscribe(res => {
      this.loadingReplyComment = false;
      this.headerReplyComments = res.header;
      this.store$.dispatch(new AddReplyComments({ commentId: this.commentId, comments: res.data }));
    });
  }
}
