import { UserInfo } from './../../../shared/core/interface/user-info.interface';
import { Action } from '@ngrx/store';

export enum UserAuthActionTypes {
  CheckLoginUserAuth = '[UserAuth] Check Login UserAuth',
  CheckLoginUserAuthSuccess = '[UserAuth] Check Login UserAuth Success',
  LoginUserAuth = '[UserAuth] Login UserAuth',
  LogoutUserAuth = '[UserAuth] Logout UserAuth',
  LoadInfoUserAuth = '[UserAuth] Load Info UserAuth',
  SaveInfoUserAuth = '[UserAuth] Save Info UserAuth',
  SaveAvatarUserAuth = '[UserAuth] Save Avatar UserAuth',
  SaveNameUserAuth = '[UserAuth] Save Name UserAuth',
}
export class CheckLoginUserAuth implements Action {
  readonly type = UserAuthActionTypes.CheckLoginUserAuth;
}

export class CheckLoginUserAuthSuccess implements Action {
  readonly type = UserAuthActionTypes.CheckLoginUserAuthSuccess;
  constructor(public payload: { id: string }) { }
}

export class LoginUserAuth implements Action {
  readonly type = UserAuthActionTypes.LoginUserAuth;
  constructor(public payload: { id: string, isKeep: boolean }) { }
}

export class LogoutUserAuth implements Action {
  readonly type = UserAuthActionTypes.LogoutUserAuth;
}

export class LoadInfoUserAuth implements Action {
  readonly type = UserAuthActionTypes.LoadInfoUserAuth;
}

export class SaveInfoUserAuth implements Action {
  readonly type = UserAuthActionTypes.SaveInfoUserAuth;
  constructor(public payload: { userInfo: UserInfo }) { }
}

export class SaveAvatarUserAuth implements Action {
  readonly type = UserAuthActionTypes.SaveAvatarUserAuth;
  constructor(public payload: { avatar: string }) { }
}

export class SaveNameUserAuth implements Action {
  readonly type = UserAuthActionTypes.SaveNameUserAuth;
  constructor(public payload: { firstName: string, lastName: string }) { }
}

export type UserAuthActions =
  CheckLoginUserAuth |
  CheckLoginUserAuthSuccess |
  LoginUserAuth |
  LogoutUserAuth |
  LoadInfoUserAuth |
  SaveInfoUserAuth |
  SaveAvatarUserAuth |
  SaveNameUserAuth;
