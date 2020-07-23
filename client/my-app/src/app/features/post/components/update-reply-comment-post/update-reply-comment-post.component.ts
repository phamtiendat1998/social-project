import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
// Service
import { PostService } from '../../services/post.service';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { mergeMap } from 'rxjs/operators';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { UpdateReplyComment } from '../../state/post.actions';

@Component({
  selector: 'app-update-reply-comment-post',
  templateUrl: './update-reply-comment-post.component.html',
  styleUrls: ['./update-reply-comment-post.component.scss']
})
export class UpdateReplyCommentPostComponent implements OnInit {
  @Input() replyCommentId: string;
  @Input() content: string;
  @Output() escEvent = new EventEmitter();
  contentCtl: FormControl;
  constructor(
    private postService: PostService,
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.contentCtl = new FormControl(this.content, Validators.required);
  }
  /*
  @ Event on key enter
  */
  onEnter() {
    this.contentCtl.disable();
    this.store$.pipe(select(selectUserId))
      .pipe(
        mergeMap(userId => this.postService.updateReplyComment(userId, this.replyCommentId, this.contentCtl.value))
      )
      .subscribe(
        res => {
          if (res) {
            this.store$.dispatch(new UpdateReplyComment({ replyCommentId: res, content: this.contentCtl.value }));
            this.escEvent.emit();
          }
        }
      )
  }
  /*
  @ Event on key esc
  */
  onEsc() {
    this.escEvent.emit();
  }
}
