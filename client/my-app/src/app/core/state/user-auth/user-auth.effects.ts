import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Rxjs
import { tap, mergeMap, map, switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';
// Service
import { CookieService } from 'ngx-cookie-service';
import { UserLoginService } from './../../../user-login/services/user-login.service';
// Store
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { UserAuthActionTypes, LogoutUserAuth, LoginUserAuth, LoadInfoUserAuth, CheckLoginUserAuthSuccess } from './user-auth.actions';
import { ResetStory } from 'src/app/features/story/state/story.actions';
import { ResetPosts } from './../../../features/post/state/post.actions';
// Key
import { keyCurrentUser } from './../../../shared/core/key/local';

@Injectable()
export class UserAuthEffects {

  @Effect()
  init$ = this.actions$.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(() => {
      if (this.cookieService.check(keyCurrentUser)) {
        const userId = JSON.parse(this.cookieService.get(keyCurrentUser));
        return new CheckLoginUserAuthSuccess({ id: userId });
      } else {
        return new LogoutUserAuth();
      }
    })
  )

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType<LoginUserAuth>(UserAuthActionTypes.LoginUserAuth),
    tap(action => {
      this.cookieService.set(
        keyCurrentUser,
        JSON.stringify(action.payload.id),
        action.payload.isKeep ? 30 : 0,
        '/'
      );
      this.router.navigateByUrl('/');
    })
  )

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<LogoutUserAuth>(UserAuthActionTypes.LogoutUserAuth),
    tap(() => {
      if (this.cookieService.check(keyCurrentUser)) {
        this.cookieService.delete(keyCurrentUser, '/');
      } else {
        return;
      }
      this.router.navigateByUrl('/welcome');
    }),
    switchMap(() => [
      new ResetPosts(),
      new ResetStory()
    ])
  )

  constructor(
    private actions$: Actions,
    private cookieService: CookieService,
    private userLoginService: UserLoginService,
    private router: Router
  ) { }

}
