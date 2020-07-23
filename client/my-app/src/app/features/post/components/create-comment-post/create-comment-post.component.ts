import { AddComments, AddComment, AddReplyComment } from './../../state/post.actions';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
// Service
import { PostService } from '../../services/post.service';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId, selectAvatar, selectUserInfo } from './../../../../core/state/user-auth/user-auth.selectors';
// Interface
import { Comment } from './../../core/interface/comment/comment.interface';

@Component({
  selector: 'app-create-comment-post',
  templateUrl: './create-comment-post.component.html',
  styleUrls: ['./create-comment-post.component.scss']
})
export class CreateCommentPostComponent implements OnInit {
  // Comment
  @Input() postId: string;
  @Input() commentlv1: boolean;
  //  Reply Comment
  @Input() commentId: string;
  @Input() commentlv2: boolean;
  // User name
  @Input() userName: string;
  @Output() addEvent = new EventEmitter();
  userAvatar$: Observable<string>;
  content: string;
  loading = false;
  constructor(
    private postService: PostService,
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.userAvatar$ = this.store$.pipe(select(selectAvatar));
  }
  /*
  @ Event enter key down
  @ Connect api
  */
  onEnter() {
    this.loading = true;
    if (this.content === '' || this.content === null || this.content === undefined) {
      return;
    }
    if (this.commentlv1) {
      this.createCommentConnectAppi();
    } else if (this.commentlv2) {
      this.createReplyCommentConnectAppi();
    }
    this.addEvent.emit(true);
  }
  /*
  @ Event esc key down
  */
  onEsc() {
    this.content = '';
    this.addEvent.emit(false);
  }
  /*
  @ Create Comment Connect api
  */
  createCommentConnectAppi() {
    this.store$.pipe(select(selectUserInfo))
      .pipe(
        mergeMap(userInfo => this.postService.createComment(userInfo, this.postId, this.content)),
      )
      .subscribe(res => {
        this.loading = false;
        if (res) {
          this.store$.dispatch(new AddComment({ postId: this.postId, comment: res }));
          this.content = '';
        }
      })
  }
  /*
  @ Create reply comment connect api
  */
  createReplyCommentConnectAppi() {
    this.store$.pipe(select(selectUserInfo))
      .pipe(
        mergeMap(userInfo => this.postService.createReplyComment(userInfo, this.commentId, this.content)),
      )
      .subscribe(res => {
        this.loading = false;
        if (res) {
          this.store$.dispatch(new AddReplyComment({ commentId: this.commentId, comment: res }));
          this.content = '';
        }
      })
  }
}
