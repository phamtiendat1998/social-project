import { fullNameConcat } from 'src/app/shared/core/helper/fullname-concat';
import { UserInfo } from './../../../shared/core/interface/user-info.interface';
import { UserAuthActions, UserAuthActionTypes } from './user-auth.actions';

export const userAuthFeatureKey = 'userAuth';

export interface UserAuthState {
  loggedIn: boolean,
  userId: string,
  userInfo: UserInfo
}

export const initialUserAuthState: UserAuthState = {
  loggedIn: false,
  userId: null,
  userInfo: null
};

export function reducer(state = initialUserAuthState, action: UserAuthActions): UserAuthState {
  switch (action.type) {
    case UserAuthActionTypes.LoginUserAuth:
      return {
        ...state,
        userId: action.payload.id,
        loggedIn: true,
      }
    case UserAuthActionTypes.CheckLoginUserAuthSuccess:
      return {
        ...state,
        userId: action.payload.id,
        loggedIn: true,
      }
    case UserAuthActionTypes.LogoutUserAuth:
      return {
        loggedIn: false,
        userId: null,
        userInfo: null
      }
    case UserAuthActionTypes.SaveInfoUserAuth:
      return {
        ...state,
        userInfo: action.payload.userInfo
      }
    case UserAuthActionTypes.SaveAvatarUserAuth:
      return {
        ...state,
        userInfo: { ...state.userInfo, avatar: action.payload.avatar }
      }
    case UserAuthActionTypes.SaveNameUserAuth:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          fullName: fullNameConcat(action.payload.firstName + '  ' + action.payload.lastName)
        }
      }
    default:
      return state;
  }
}
