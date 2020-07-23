import { Component, OnInit, Input } from '@angular/core';
// Mat
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteReplyCommentPostComponent } from '../dialog-delete-reply-comment-post/dialog-delete-reply-comment-post.component';
// Rxjs
import { Observable } from 'rxjs';
// Interface
import { ReplyComment } from '../../core/interface/comment/reply-comment-interface';
// Store
import { Store, select } from '@ngrx/store';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { selectReplyComment } from './../../state/post.selectors';
import { AppState } from 'src/app/core/state';
// Service
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-reply-comment-post',
  templateUrl: './reply-comment-post.component.html',
  styleUrls: ['./reply-comment-post.component.scss']
})
export class ReplyCommentPostComponent implements OnInit {
  @Input() replyCommentId: string;
  replyComment$: Observable<ReplyComment>;
  userId$: Observable<string>;
  isUpdateReplyComment = false;
  constructor(
    private store$: Store<AppState>,
    public dialog: MatDialog,
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.replyComment$ = this.store$.pipe(select(selectReplyComment, { id: this.replyCommentId }));
    this.userId$ = this.store$.pipe(select(selectUserId));
  }
  /*
  @ Update reply comment
  */
  onUpdateReplyComment() {
    this.isUpdateReplyComment = true;
  }
  /*
  @ Open dialog delete reply comment
  */
  onClickOpenDialogDeleteReplyComment() {
    this.dialog.open(DialogDeleteReplyCommentPostComponent, {
      width: '540px',
      data: this.replyCommentId
    });
  }
  /*
  @ Close update comment
  */
  onCloseUpdateReplyComment() {
    this.isUpdateReplyComment = false;
  }
}
