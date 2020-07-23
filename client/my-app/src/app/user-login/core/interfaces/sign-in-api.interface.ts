import { SignInStatus } from './../enums/sign-in-status.enum';
export interface SignInApi {
    status: SignInStatus,
    token?: string;
    id?: string;
}