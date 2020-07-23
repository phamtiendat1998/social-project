import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromUserAuth from './user-auth/user-auth.reducer';

export interface AppState {
  userAuth: fromUserAuth.UserAuthState
}

export const reducers: ActionReducerMap<AppState> = {
  userAuth: fromUserAuth.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
