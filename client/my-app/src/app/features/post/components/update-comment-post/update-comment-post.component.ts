import { mergeMap } from 'rxjs/operators';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
// Service
import { PostService } from '../../services/post.service';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { UpdateComment } from '../../state/post.actions';

@Component({
  selector: 'app-update-comment-post',
  templateUrl: './update-comment-post.component.html',
  styleUrls: ['./update-comment-post.component.scss']
})
export class UpdateCommentPostComponent implements OnInit {
  @Input() commentId: string;
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
        mergeMap(userId => this.postService.updateComment(userId, this.commentId, this.contentCtl.value))
      )
      .subscribe(
        res => {
          if (res) {
            this.store$.dispatch(new UpdateComment({ commentId: res, content: this.contentCtl.value }));
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
