import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Domain
import { domain } from 'src/app/shared/core/key/domain';
// Interface
import { ResponseData } from '../../shared/core/interface/response-data.interface';
import { MappedResponse } from '../../shared/core/interface/mapped-respone.interface';
import { SignInApi } from '../core/interfaces/sign-in-api.interface';
import { UserInfo } from './../../shared/core/interface/user-info.interface';
// Enum
import { ApiState } from '../../shared/core/enum/api-state.enum';
import { SignInStatus } from '../core/enums/sign-in-status.enum';
// Helper
import { getProfileUserLink } from 'src/app/shared/core/helper/get-profile-user-link';
import { fullNameConcat } from 'src/app/shared/core/helper/fullname-concat';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private isUserNameExistedApi = domain + '/api/account/checkexistusername';
  private addNewAccountApi = domain + '/api/account/insertnewaccount';
  private newPasswordApi = domain + '/api/account/forgotpassword';
  private signInApi = domain + '/api/account/login';
  private sentOTPApi = domain + '/api/account/sendOTP';
  private verifyOTPApi = domain + '/api/account/verifyotpactiveaccount';
  private getInfoApi = domain + '/api/account/getinfo';
  private confirmOTPApi = domain + '/api/account/confirmotp';
  constructor(private httpClient: HttpClient) { }
  /*
  @ User login
  @ Input: User Id
  @ Ouput: UserInfo
 */
  getInfoUser(id: string): Observable<UserInfo> {
    return this.httpClient.get<ResponseData>(`${this.getInfoApi}?idUser=${id}`)
      .pipe(
        map(res => {
          if (res.Data) {
            const userInfo: UserInfo = {
              userId: res.Data.IdUser,
              firstName: res.Data.FirstName,
              lastName: res.Data.LastName,
              fullName: fullNameConcat(res.Data.FirstName + '      ' + res.Data.LastName),
              avatar: res.Data.Avatar,
              link: getProfileUserLink()
            }
            return userInfo;
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Check for an exists account
  @ Input: Email or Phone Number
  @ Output (Observable): True, False
  */
  isUserNameExisted(orEmailPhonenumber: string): Observable<boolean> {
    return this.httpClient.get<ResponseData>(`${this.isUserNameExistedApi}?username=${orEmailPhonenumber}`)
      .pipe(
        map(res => {
          return res.Data === 'User exist' ? true : false;
        })
      );
  }
  /*
  @ Add new account
  @ Input: NewAccount Object
  @ Output (Observable): ApiState enum
  */
  addNewAccount(
    email: string,
    phoneNumber: string,
    password: string,
    passwordConfirm: string,
    type: number,
    firstName: string,
    lastName: string,
    gender: number,
    dateOfBirth: Date
  ): Observable<MappedResponse> {
    return this.httpClient.post<ResponseData>(`${this.addNewAccountApi}`,
      {
        Email: email,
        PhoneNumber: phoneNumber,
        Password: password,
        PasswordConfirm: passwordConfirm,
        Type: type,
        FirstName: firstName,
        LastName: lastName,
        Gender: gender,
        DateOfBirth: dateOfBirth
      })
      .pipe(
        map(res => {
          return res.ContentType === 'success' ? { State: ApiState.SUCCESS, Data: res.Data } : { State: ApiState.FAIL };
        })
      );
  }
  /*
  @ New password
  @ Input: NewPassword Object
  @ Output (Observable): ApiState enum
  */
  newPassWord(userId: string, password: string, passwordConfirm: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.newPasswordApi}`,
      {
        UserId: userId,
        Password: password,
        PasswordConfirm: passwordConfirm
      })
      .pipe(
        map(res => {
          return res.Data === 'Update password success' ? true : false;
        })
      );
  }
  /*
  @ Sign in
  @ Input: UserName ,Password
  @ Output (Observable): AccountSignIn enum
  */
  signIn(userName: string, password: string): Observable<SignInApi> {
    return this.httpClient.post<ResponseData>(`${this.signInApi}`,
      {
        UserName: userName,
        Password: password
      })
      .pipe(
        map(res => {
          if (res.ContentType === 'Login success, not active') {
            return { status: SignInStatus.ACTIVE_ACCOUNT, id: res.Data.id };
          } else if (res.ContentType === 'Login failed') {
            return { status: SignInStatus.FAIL };
          } else if (res.ContentType === 'Login success') {
            return { status: SignInStatus.SUCCESS, token: res.Data.token, id: res.Data.id };
          } else {
            return { status: SignInStatus.BLOCK }
          }
        })
      );
  }
  /*
  @ Sent OTP for non-active account
  @ Input: Userame of account
  @ Output (Observable): ApiState enum
  */
  sentOTP(idUser: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.sentOTPApi}`,
      {
        IdUser: idUser
      })
      .pipe(
        map(res => {
          if (res.Data === 'failed' && res.Data === 'Send failed') {
            return false;
          } else if (res.Data.IdUser) {
            return true;
          }
        })
      );
  }
  /*
 @ Sent OTP for non-active account
 @ Input: Userame of account
 @ Output (Observable): ApiState enum
 */
  sentOTPForgot(username: string): Observable<boolean | string> {
    return this.httpClient.post<ResponseData>(`${this.sentOTPApi}`,
      {
        Username: username
      })
      .pipe(
        map(res => {
          if (res.Data === 'failed' && res.Data === 'Send failed') {
            return false;
          } else if (res.Data.IdUser) {
            return res.Data.IdUser;
          }
        })
      );
  }
  /*
  @ Verify OTP for non-active account
  @ Input: OTP object + OTP Code
  @ Output (Observable): ApiState enum
  */
  verifyOTP(userId: string, otpCode: string): Observable<MappedResponse> {
    return this.httpClient.post<ResponseData>(`${this.verifyOTPApi}`,
      {
        IdUser: userId,
        OTPCode: otpCode
      })
      .pipe(
        map(res => {
          if (res.Data === 'account actived success') {
            return { State: ApiState.SUCCESS };
          } else if (res.Data === 'account active failed') {
            return { State: ApiState.FAIL };
          }
        })
      );
  }
  /*
  @ Confirm otp for forgot password
  */
  confirmOTP(userId: string, otpCode: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.confirmOTPApi}`, {
      IdUser: userId,
      OTPCode: otpCode
    })
      .pipe(
        map(res => {
          console.log(res);
          if (res.Data === 'Confirm success') {
            return true;
          } else if (res.Data === 'Confirm failed') {
            return false;
          }
        })
      );
  }
}
