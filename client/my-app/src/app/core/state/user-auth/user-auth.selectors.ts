import { UserAuthState } from './user-auth.reducer';
import { AppState } from '../index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserAuthState = (state: AppState) => state.userAuth;

export const isLoggedIn = createSelector(
    selectUserAuthState,
    (userAuth: UserAuthState) => userAuth.loggedIn
)

export const selectAvatar = createSelector(
    selectUserAuthState,
    (userAuth: UserAuthState) => userAuth.userInfo?.avatar
)

export const selectFullnameUserInfo = createSelector(
    selectUserAuthState,
    (userAuth: UserAuthState) => userAuth.userInfo?.fullName
)

export const selectUserInfo = createSelector(
    selectUserAuthState,
    (userAuth: UserAuthState) => userAuth.userInfo
)

export const selectUserId = createSelector(
    selectUserAuthState,
    (userAuth: UserAuthState) => userAuth.userId
)
export const selectIsOwnUser = createSelector(
    selectUserAuthState,
    (state: UserAuthState, props) => {
        if (props.id === state.userId) {
            return true;
        } else {
            return false;
        }
    }
)