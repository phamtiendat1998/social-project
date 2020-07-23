import { Action } from '@ngrx/store';

export enum PersonalInformationActionTypes {
  LoadPersonalInformations = '[PersonalInformation] Load PersonalInformations',
  
  
}

export class LoadPersonalInformations implements Action {
  readonly type = PersonalInformationActionTypes.LoadPersonalInformations;
}


export type PersonalInformationActions = LoadPersonalInformations;
