
import { Injectable } from '@angular/core';
// Rxjs
import { map, withLatestFrom, mergeMap } from 'rxjs/operators';
// Service
import { PostService } from './../services/post.service';
// Store
import { Actions, Effect, ofType } from '@ngrx/effects';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { PostActionTypes, LoadComments, AddComments, LikePost, LikePostSuccess, DislikePost, DislikePostSuccess } from './post.actions';
// Interface
import { FullPost } from './../core/interface/post/full-post.interface';
import { of } from 'rxjs';


@Injectable()
export class PostEffects {

  @Effect()
  likePost$ = this.actions$.pipe(
    ofType<LikePost>(PostActionTypes.LikePost),
    withLatestFrom(this.store$.select(selectUserId)),
    mergeMap(([action, userId]) => this.postService.likePost(action.payload.postId, userId)),
    map(res => {
      if (res) {
        return new LikePostSuccess({ postId: res });
      } else {
        return of(null);
      }
    })
  )

  @Effect()
  dislikePost$ = this.actions$.pipe(
    ofType<DislikePost>(PostActionTypes.DislikePost),
    withLatestFrom(this.store$.select(selectUserId)),
    mergeMap(([action, userId]) => this.postService.dislikePost(action.payload.postId, userId)),
    map(res => {
      if (res) {
        return new DislikePostSuccess({ postId: res });
      } else {
        return of(null);
      }
    })
  )

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private postService: PostService
  ) { }

}
