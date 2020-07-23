import { StudyField } from './../core/interfaces/study-field.interface';
import { BasicUserInfo } from './../core/interfaces/basic-user-info.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Domain
import { domain } from 'src/app/shared/core/key/domain';
// Rxjs
import { Observable } from 'rxjs/internal/Observable';
import { map, filter, delay } from 'rxjs/operators';
// Service
import { CookieService } from 'ngx-cookie-service';
// Inteface
import { ResponseData } from 'src/app/shared/core/interface/response-data.interface';
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
import { LiveField } from './../core/interfaces/live-field.interface';
import { WorkField } from '../core/interfaces/work-field.interface';
import { AboutField } from '../core/interfaces/about-field.interface';
// Enum
import { AboutFieldType } from '../core/enums/about-field-type.enum';
// Helper
import { fullNameConcat } from 'src/app/shared/core/helper/fullname-concat';
import { getProfileUserLink } from 'src/app/shared/core/helper/get-profile-user-link';
// Key
import { keyCurrentUser } from './../../../shared/core/key/local';
import { FriendTab } from '../core/interfaces/friend-tab.interface';


@Injectable({
  providedIn: 'root'
})
export class PersonalInformationService {
  private getAccountApi = domain + '/api/useraccount/getaccount';
  private getInfoApi = domain + '/api/account/getinfo';
  private updateInfoApi = domain + '/api/userinfo/updateinfo';
  private getBasicUserInfoApi = domain + '/api/userinfo/getinfo';
  private getFriendsApi = domain + '/api/useraccount/getfriends';
  private getPublicInfoApi = domain + '/api/userinfo/getbasicinfo';
  private getAddressApi = domain + '/api/userinfo/getaddressofuser';
  private getAddressPublicApi = domain + '/api/userinfo/getaddressofuserpublic';
  private addAddressApi = domain + '/api/userinfo/insertaddress';
  private removeAddressApi = domain + '/api/userinfo/deleteaddress';
  private editAddressApi = domain + '/api/userinfo/updateaddress';
  private getQuantityRequestFriendsApi = domain + '/api/useraccount/getquantityrequestfriend';
  private getRequestUserApi = domain + '/api/useraccount/getrequestfriends';
  private sentRequestUserApi = domain + '/api/useraccount/createrequestfriend';
  private denyRequestUserAPI = domain + '/api/useraccount/removerequestfriend';
  private acceptRequestUserAPI = domain + '/api/useraccount/createfriend';
  private getSuggestUserApi = domain + '/api/useraccount/getfriendssuggest';
  private removeSuggestUserApi = domain + '/api/useraccount/removesuggestfriend';
  private blockUserApi = domain + '/api/useraccount/createusersexclude';
  private removeBlockUserApi = domain + '/api/useraccount/removeusersexclude';
  private getBlockUsersApi = domain + '/api/useraccount/getusersexclude';
  private getQuantityBlockUserApi = domain + '/api/useraccount/quantityuserexcluded';
  private getQuantityFollowerApi = domain + '/api/useraccount/getquantityfollowers';
  private removeFrendApi = domain + '/api/useraccount/removefriend';
  private getQuanityFriendApi = domain + '/api/useraccount/getquantityfriend';
  private getMutualFriendApi = domain + '/api/useraccount/getinfouserparallel';
  private getQuantityMutualFriendApi = domain + '/api/useraccount/quantityfriendparallel';
  private getStudyApi = domain + '/api/userinfo/getintrostudy';
  private getStudyPublicApi = domain + '/api/userinfo/getintrostudypublic';
  private addStudyApi = domain + '/api/userinfo/insertintrostudy';
  private removeStudyApi = domain + '/api/userinfo/deleteintrostudy';
  private editStudyApi = domain + '/api/userinfo/updateintrostudy';
  private getWorkApi = domain + '/api/userinfo/getintroworking';
  private getWorkPublicApi = domain + '/api/userinfo/getintroworkingpublic';
  private addWorkApi = domain + '/api/userinfo/insertintroworking';
  private removeWorkApi = domain + '/api/userinfo/deleteintroworking';
  private editWorkApi = domain + '/api/userinfo/updateintroworking';
  private isFollowApi = domain + '/api/useraccount/isfollowing';
  private isFriendApi = domain + '/api/useraccount/isfriend';
  private sentFollowApi = domain + '/api/useraccount/createfollows';
  private removeFollowApi = domain + '/api/useraccount/removefollow';


  constructor(
    private httpClient: HttpClient,
  ) { }
  /*
  @ Get account 
  @ Input: idUser
  */
  getCoverProfile(idUser: string): Observable<string> {
    return this.httpClient.get<any>(`${this.getAccountApi}?idUser=${idUser}`)
      .pipe(
        map(res => {
          if (res) {
            return res.Cover;
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Get info 
  @ Input: idUser
  */
  getInfo(idUser: string): Observable<UserInfo> {
    return this.httpClient.get<ResponseData>(`${this.getInfoApi}?idUser=${idUser}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            const userInfo: UserInfo = {
              userId: res.Data.IdUser,
              firstName: res.Data.FirstName,
              lastName: res.Data.LastName,
              fullName: fullNameConcat(res.Data.FirstName + '    ' + res.Data.LastName),
              avatar: res.Data.Avatar,
              link: getProfileUserLink(),
            };
            return userInfo;
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Get public info
  */
  getPublicInfo(userId: string): Observable<AboutField[]> {
    return this.httpClient.get<ResponseData>(`${this.getPublicInfoApi}?idUser=${userId}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            let abouts: AboutField[] = [];
            if (res.Data.Info) {
              const date = new Date(res.Data.Info.Birthday);
              const dateOfBirth: AboutField = {
                detail: String(date.getDate()) + '/' + String(date.getMonth()) + '/' + String(date.getFullYear()),
                link: null,
                type: AboutFieldType.BIRTHDAY
              };
              const name: AboutField = {
                detail: fullNameConcat(res.Data.Info.FirstName + '       ' + res.Data.Info.LastName),
                link: null,
                type: AboutFieldType.NAME
              };
              const gender: AboutField = {
                detail: res.Data.Info.Gender == null ? 'Chưa xác định giới tính' : res.Data.Gender ? 'Nam' : 'Nữ',
                link: null,
                type: AboutFieldType.GENDER
              };
              abouts = [...abouts, name, dateOfBirth, gender];
            }
            if (res.Data.Address !== null && res.Data.Address.length > 0) {
              const addresses = res.Data.Address.map(item => {
                const newItem: AboutField = {
                  type: AboutFieldType.LIVE,
                  detail: item.DetailAddress,
                  time: { from: item.LiveFrom, to: item.LiveTo },
                  link: null,
                };
                abouts = [...abouts, newItem];
                return newItem;
              });
            }
            if (res.Data.IntroStudy !== null && res.Data.IntroStudy.length > 0) {
              const studies = res.Data.IntroStudy.map(item => {
                const newItem: AboutField = {
                  type: AboutFieldType.STUDY,
                  detail: item.Studying,
                  time: { from: item.StudyFrom, to: item.StudyTo },
                  link: null,
                };
                abouts = [...abouts, newItem];
                return newItem;
              });
            }
            if (res.Data.IntroWorking !== null && res.Data.IntroWorking.length > 0) {
              const studies = res.Data.IntroWorking.map(item => {
                const newItem: AboutField = {
                  type: AboutFieldType.WORK,
                  detail: item.WorkingAt,
                  time: { from: item.WorkFrom, to: item.WorkTo },
                  link: null,
                };
                abouts = [...abouts, newItem];
                return newItem;
              });
            }
            return abouts;
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Update info 
  @ Input: idUser
  */
  updateNameUserInfo(userID: string, infoID: string, firstName: string, lastName: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.updateInfoApi}`, {
      IdInfo: infoID,
      IdUser: userID,
      LastName: lastName,
      FirstName: firstName,
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data == 'Updated succsess') {
            return true;
          } else {
            return false;
          }
        })
      );
  }
  /*
  @ Update info 
  @ Input: idUser
  */
  updateBirthdayUserInfo(userID: string, infoID: string, dateOfBirth: Date): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.updateInfoApi}`, {
      IdInfo: infoID,
      IdUser: userID,
      DateOfBirth: dateOfBirth,
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data == 'Updated succsess') {
            return true;
          } else {
            return false;
          }
        })
      );
  }
  /*
  @ Update info 
  @ Input: idUser
  */
  updateGenderUserInfo(userID: string, infoID: string, gender: boolean): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.updateInfoApi}`, {
      IdInfo: infoID,
      IdUser: userID,
      Gender: gender,
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data == 'Updated succsess') {
            return true;
          } else {
            return false;
          }
        })
      );
  }
  /*
  @ Get basic user infor
  @ Input: idUser
  */
  getBasicUserInfo(userId: string): Observable<BasicUserInfo> {
    return this.httpClient.get<ResponseData>(`${this.getBasicUserInfoApi}?idUser=${userId}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            const date = new Date(res.Data.DateOfBirth);
            const bacsicUserInfo: BasicUserInfo = {
              nameField: {
                userId: userId,
                infoId: res.Data.IdInfo,
                firstName: res.Data.FirstName,
                lastName: res.Data.LastName,
                fullName: fullNameConcat(res.Data.FirstName + '       ' + res.Data.LastName),
              },
              phoneNumber: {
                infoId: res.Data.IdInfo,
                userId: userId,
                number: null
              },
              birthDay: {
                userId: userId,
                infoId: res.Data.IdInfo,
                dd: String(date.getDate()),
                mm: String(date.getMonth()),
                yyyy: String(date.getFullYear()),
              },
              gender: {
                userId: userId,
                infoId: res.Data.IdInfo,
                gender: res.Data.Gender
              },
            };
            return bacsicUserInfo;
          } else {
            return null;
          }
        })
      );
  }
  /*
 @ Get basic user infor in profile
 @ Input: idUser
 */
  getBasicUserInfoProfile(userId: string): Observable<AboutField[]> {
    return this.httpClient.get<ResponseData>(`${this.getBasicUserInfoApi}?idUser=${userId}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            const date = new Date(res.Data.DateOfBirth);
            const dateOfBirth: AboutField = {
              detail: String(date.getDate()) + '/' + String(date.getMonth()) + '/' + String(date.getFullYear()),
              link: null,
              type: AboutFieldType.BIRTHDAY
            };
            const name: AboutField = {
              detail: fullNameConcat(res.Data.FirstName + '       ' + res.Data.LastName),
              link: null,
              type: AboutFieldType.NAME
            };
            const gender: AboutField = {
              detail: res.Data.Gender == null ? 'Chưa xác định giới tính' : res.Data.Gender ? 'Nam' : 'Nữ',
              link: null,
              type: AboutFieldType.GENDER
            };
            const abouts: AboutField[] = [name, dateOfBirth, gender];
            return abouts;
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Get relationship 
  @ Input: idUser
  */
  getRelationShipInfo(idUser: string): Observable<UserInfo> {
    return this.httpClient.get<ResponseData>(`${this.getInfoApi}?idUser=${idUser}`)
      .pipe(
        map(res => {
          if (res.Data) {
            const userInfo: UserInfo = {
              userId: res.Data.IdUser,
              firstName: res.Data.FirstName,
              lastName: res.Data.LastName,
              fullName: fullNameConcat(res.Data.FirstName + '    ' + res.Data.LastName),
              avatar: res.Data.Avatar,
              link: getProfileUserLink(),
            };
            return userInfo;
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Get friend of user 
  @ Input: idUser
  */
  getFriend(idUser: string): Observable<UserInfo[] | null> {
    return this.httpClient.get<ResponseData>(`${this.getFriendsApi}?idUser=${idUser}&isBig=${true}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            return res.Data.map(item => {
              const user: UserInfo = {
                userId: item.IdUser,
                avatar: item.Avatar == '' ? null : item.Avatar,
                firstName: item.FirstName,
                lastName: item.LastName,
                fullName: fullNameConcat(item.FirstName + '    ' + item.LastName),
                link: getProfileUserLink(),
              }
              return user;
            })
          } else if (res.Data === null) {
            return [];
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Get friend of user profile
  @ Input: idUser
  */
  getFriendTab(idUser: string): Observable<FriendTab[] | null> {
    return this.httpClient.get<ResponseData>(`${this.getFriendsApi}?idUser=${idUser}&isBig=${false}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            return res.Data.map(item => {
              const user: FriendTab = {
                userId: item.IdUser,
                avatar: item.Avatar == '' ? null : item.Avatar,
                fullName: fullNameConcat(item.FirstName + '    ' + item.LastName),
                link: getProfileUserLink(),
              }
              return user;
            })
          } else if (res.Data === null) {
            return [];
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Get friend of user 
  @ Input: idUser
  */
  getQuanityFriend(idUser: string): Observable<number> {
    return this.httpClient.get<ResponseData>(`${this.getQuanityFriendApi}?idUser=${idUser}`)
      .pipe(
        map(res => {
          if (res.Data !== null) {
            return res.Data;
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Get address
  */
  getAddress(idUser: string): Observable<LiveField[]> {
    return this.httpClient.get<ResponseData>(`${this.getAddressApi}?idUser=${idUser}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            const lives = res.Data.map(item => {
              const newItem: LiveField = {
                userId: item.IdUser,
                liveId: item.IdUserAddress,
                address: item.DetailAddress,
                city: item.City,
                province: item.Province,
                country: item.Country,
                from: item.LiveFrom,
                to: item.LiveTo,
                place: item.DetailAddress,
                public: item.Status == null || item.Status == 1 ? true : false,
                link: null
              }
              return newItem;
            })
            return lives.filter(item => item.country !== null);
          } else {
            return [];
          }
        })
      );
  }
  /*
  @ Get address public
  */
  getAddressPublic(idUser: string): Observable<AboutField[]> {
    return this.httpClient.get<ResponseData>(`${this.getAddressPublicApi}?idUser=${idUser}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            const lives = res.Data.map(item => {
              const newItem: AboutField = {
                type: AboutFieldType.LIVE,
                detail: item.DetailAddress,
                time: { from: item.LiveFrom, to: item.LiveTo },
                link: null,
              }
              return newItem;
            })
            return lives;
          } else {
            return [];
          }
        })
      );
  }
  /*
  @ Add address
  */
  addAddress(userId: string, address: string, city: string, province: string, country: string, from: string, to: string, publicState: boolean): Observable<string> {
    return this.httpClient.post<ResponseData>(`${this.addAddressApi}`, {
      IdUser: userId,
      DetailAddress: address,
      City: city,
      Province: province,
      Country: country,
      Status: publicState ? 1 : 2,
      LiveFrom: from,
      LiveTo: to == '2020' || to == null ? null : to
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            return res.Data;
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Remove address
  */
  removeAddress(userId: string, liveId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.removeAddressApi}`, {
      IdUser: userId,
      IdUserAddress: liveId,
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data == 'Deleted address') {
            return true;
          } else {
            return false;
          }
        })
      );
  }
  /*
  @ Edit address
  */
  editAddress(
    userId: string,
    addressId: string,
    address: string,
    city: string,
    province: string,
    country: string,
    from: string,
    to: string,
    publicState: boolean
  ): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.editAddressApi}`, {
      IdUser: userId,
      IdUserAddress: addressId,
      DetailAddress: address,
      City: city,
      Province: province,
      Country: country,
      LiveFrom: from,
      LiveTo: to == '2020' || to == null ? null : to,
      Status: publicState ? 1 : 2,
    })
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data == 'Updated adrress succsess') {
              return true;
            } else {
              return false;
            }
          }
        )
      )
  }
  /*
  @ Get quantity request
  */
  getQuantityRequest(userId: string): Observable<number> {
    return this.httpClient.get<ResponseData>(`${this.getQuantityRequestFriendsApi}?idUser=${userId}`)
      .pipe(
        map(res => {
          if (res.Data) {
            return res.Data;
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Get request users
  */
  getRequestUsers(userId: string): Observable<UserInfo[]> {
    return this.httpClient.get<ResponseData>(`${this.getRequestUserApi}?idUser=${userId}&isBig=${true}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            return res.Data.map(item => {
              const user: UserInfo = {
                userId: item.IdUser,
                avatar: item.UserInfo.Avatar == '' ? null : item.UserInfo.Avatar,
                firstName: item.UserInfo.FirstName,
                lastName: item.UserInfo.LastName,
                fullName: fullNameConcat(item.UserInfo.FirstName + '    ' + item.UserInfo.LastName),
                link: getProfileUserLink(),
              }
              return user;
            })
          } else if (res.Data === null) {
            return [];
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Sent request user
  */
  sentRequestUser(userId: string, requestUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.sentRequestUserApi}`, {
      IdUser: userId,
      IdUserRequest: requestUserId
    })
      .pipe(
        map(res => {
          return res.Data === 'created request friend' ? true : false;
        })
      )
  }
  /*
  @ Deny request user
  */
  denyRequestUser(userId: string, requestUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.denyRequestUserAPI}`, {
      IdUser: userId,
      IdUserRequest: requestUserId
    })
      .pipe(
        map(res => {
          if (res === 'ffailed remove request friend') {
            return false;
          } else {
            return true;
          }
        })
      )
  }
  /*
  @ Accept request user
  */
  acceptRequestUser(userId: string, requestUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.acceptRequestUserAPI}`, {
      IdUser: userId,
      IdUserFriend: requestUserId
    })
      .pipe(
        map(res => {
          if (res === 'failed create friend') {
            return false;
          } else {
            return true;
          }
        })
      )
  }
  /*
  @ Get suggest user
  */
  getSuggestUser(userId: string) {
    return this.httpClient.get<ResponseData>(`${this.getSuggestUserApi}?idUser=${userId}&isBig=${true}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            return res.Data.map(item => {
              const user: UserInfo = {
                userId: item.IdUser,
                avatar: item.UserInfo.Avatar == '' ? null : item.UserInfo.Avatar,
                firstName: item.UserInfo.FirstName,
                lastName: item.UserInfo.LastName,
                fullName: fullNameConcat(item.UserInfo.FirstName + '    ' + item.UserInfo.LastName),
                link: getProfileUserLink(),
              }
              return user;
            })
          } else if (res.Data === null) {
            return [];
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Remove suggest user
  */
  removeSuggestUser(userId: string, suggestUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.removeSuggestUserApi}`, {
      IdUser: userId,
      IdUserRequest: suggestUserId
    })
      .pipe(
        map(res => {
          if (res.Data) {
            return null;
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Block user
  */
  blockUser(userId: string, blockedUserId): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.blockUserApi}`, {
      IdUser: userId,
      IdUserExclude: blockedUserId,
      Status: 2
    })
      .pipe(
        map(res => {
          if (res.Data == 'created exclude') {
            return true;
          } else {
            return false;
          }
        })
      )
  }
  /*
  @ Get quantity blocked user
  */
  getQuantityBlockUser(userId: string): Observable<number> {
    return this.httpClient.get<ResponseData>(`${this.getQuantityBlockUserApi}?idUser=${userId}`)
      .pipe(
        map(res => {
          if (res.Data) {
            return res.Data;
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Get block users
  */
  getBlockUsers(userId: string): Observable<UserInfo[]> {
    return this.httpClient.post<ResponseData>(`${this.getBlockUsersApi}?isBig=${true}`, {
      IdUser: userId,
      Status: 2
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            return res.Data.map(item => {
              const user: UserInfo = {
                userId: item.UserInfo.IdUser,
                avatar: item.UserInfo.Avatar == '' ? null : item.UserInfo.Avatar,
                firstName: item.UserInfo.FirstName,
                lastName: item.UserInfo.LastName,
                fullName: fullNameConcat(item.UserInfo.FirstName + '    ' + item.UserInfo.LastName),
                link: getProfileUserLink(),
              }
              return user;
            })
          } else if (res.Data === null) {
            return [];
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Remove block user
  */
  removeBlockUser(userId: string, blockedUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.removeBlockUserApi}`, {
      IdUser: userId,
      IdUserExclude: blockedUserId,
      Status: 2
    })
      .pipe(
        map(res => {
          if (res.Data === 'created exclude') {
            return true;
          } else {
            return false;
          }
        })
      )
  }
  /*
  @ Get quantity follower
  */
  getQuantityFollower(userId: string): Observable<number> {
    return this.httpClient.get<ResponseData>(`${this.getQuantityFollowerApi}?idUser=${userId}`)
      .pipe(
        map(res => {
          if (res.Data !== null) {
            return res.Data;
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Remove friend
  */
  removeFriend(userId: string, requestUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.removeFrendApi}`, {
      IdUser: userId,
      IdUserFriend: requestUserId
    })
      .pipe(
        map(res => {
          return res.Data === 'removed friend' ? true : false;
        })
      )
  }
  /*
  @ Get quantity mutual friend
  */
  getMutualFriend(userId: string, mutualUserId: string): Observable<UserInfo[]> {
    return this.httpClient.post<ResponseData>(`${this.getMutualFriendApi}`, {
      IdUser: userId,
      IdUserParallel: mutualUserId
    })
      .pipe(
        map(res => {
          console.log(res);
          if (res.Data) {
            return res.Data.map(item => {
              const user: UserInfo = {
                userId: item.UserInfo.IdUser,
                avatar: item.UserInfo.Avatar == '' ? null : item.UserInfo.Avatar,
                firstName: item.UserInfo.FirstName,
                lastName: item.UserInfo.LastName,
                fullName: fullNameConcat(item.UserInfo.FirstName + '    ' + item.UserInfo.LastName),
                link: getProfileUserLink(),
              }
              return user;
            })
          } else {
            return [];
          }
        })
      )
  }
  /*
  @ Get mutual friend
  */
  getQuantityMutualFriend(userId: string, mutualUserId: string): Observable<number> {
    return this.httpClient.post<ResponseData>(`${this.getQuantityMutualFriendApi}?isBig=${true}`, {
      IdUser: userId,
      IdUserParallel: mutualUserId
    })
      .pipe(
        map(res => {
          console.log(res);
          if (res.Data !== null) {
            return res.Data;
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Get study
  */
  getStudy(userId: string): Observable<StudyField[]> {
    return this.httpClient.get<ResponseData>(`${this.getStudyApi}?idUser=${userId}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data && res.Data.length > 0) {
            const studies = res.Data.map(item => {
              const newItem: StudyField = {
                userId: userId,
                studyId: item.IdStudy,
                introId: item.IdUserIntro,
                school: item.Studying,
                from: item.StudyFrom,
                to: item.StudyTo,
                link: null,
                public: item.Status == 1 ? true : false,
              }
              return newItem;
            })
            return studies;
          } else {
            return [];
          }
        })
      );
  }
  /*
  @ Get study public
  */
  getStudyPublic(userId: string): Observable<AboutField[]> {
    return this.httpClient.get<ResponseData>(`${this.getStudyPublicApi}?idUser=${userId}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data && res.Data.length > 0) {
            const studies = res.Data.map(item => {
              const newItem: AboutField = {
                type: AboutFieldType.STUDY,
                detail: item.Studying,
                time: { from: item.StudyFrom, to: item.StudyTo },
                link: null,
              }
              return newItem;
            })
            return studies;
          } else {
            return [];
          }
        })
      );
  }
  /*
  @ Add sudy
  */
  addStudy(userId: string, school: string, from: string, to: string, publicState: boolean): Observable<string> {
    return this.httpClient.post<ResponseData>(`${this.addStudyApi}`, {
      IdUserIntro: userId,
      Studying: school,
      Status: publicState ? 1 : 2,
      StudyFrom: from,
      StudyTo: to,
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data && res.Data !== 0) {
            return res.Data;
          } else {
            return null;
          }
        })
      );
  }
  /*
  @ Remove study
  */
  removeStudy(userId: string, studyId: string, introId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.removeStudyApi}`, {
      IdUser: userId,
      IdStudy: studyId,
      IdIntro: introId
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data == 1) {
            return true;
          } else {
            return false;
          }
        })
      );
  }
  /*
  @ Edit study
  */
  editStudy(
    userId: string,
    studyId: string,
    introId: string,
    at: string,
    from: string,
    to: string,
    publicState: boolean
  ): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.editStudyApi}`, {
      IdUser: userId,
      IdStudy: studyId,
      IdUserIntro: introId,
      Studying: at,
      StudyFrom: from,
      StudyTo: to == '2020' || to == null ? null : to,
      Status: publicState ? 1 : 2,
    })
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data == 1) {
              return true;
            } else {
              return false;
            }
          }
        )
      )
  }
  /*
  @ Get work
  */
  getWork(userId: string): Observable<WorkField[]> {
    return this.httpClient.get<ResponseData>(`${this.getWorkApi}?idUser=${userId}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data && res.Data.length > 0) {
            const works = res.Data.map(item => {
              const newItem: WorkField = {
                userId: userId,
                workId: item.IdWorking,
                introId: item.IdUserIntro,
                place: item.WorkingAt,
                from: item.WorkFrom,
                to: item.WorkTo,
                link: null,
                public: item.Status == 1 ? true : false,
              }
              return newItem;
            })
            return works;
          } else {
            return [];
          }
        })
      );
  }
  /*
  @ Get work public
  */
  getWorkPublic(userId: string): Observable<AboutField[]> {
    return this.httpClient.get<ResponseData>(`${this.getWorkPublicApi}?idUser=${userId}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data && res.Data.length > 0) {
            const works = res.Data.map(item => {
              const newItem: AboutField = {
                type: AboutFieldType.WORK,
                detail: item.WorkingAt,
                time: { from: item.WorkFrom, to: item.WorkTo },
                link: null,
              }
              return newItem;
            })
            return works;
          } else {
            return [];
          }
        })
      );
  }
  /*
  @ Add work
  */
  addWork(userId: string, place: string, from: string, to: string, publicState: boolean): Observable<string> {
    return this.httpClient.post<ResponseData>(`${this.addWorkApi}`, {
      IdUserIntro: userId,
      WorkingAt: place,
      Status: publicState ? 1 : 2,
      WorkFrom: from,
      WorkTo: to,
    })
      .pipe(
        delay(500),
        map(res => {
          console.log(res);
          if (res.Data && res.Data !== 0) {
            return res.Data;
          } else {
            return null;
          }
        })
      );
  }
  /*
 @ Remove work
 */
  removeWork(userId: string, workId: string, introId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.removeWorkApi}`, {
      IdUser: userId,
      IdWorking: workId,
      IdIntro: introId
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data == 1) {
            return true;
          } else {
            return false;
          }
        })
      );
  }
  /*
  @ Edit work
  */
  editWork(
    userId: string,
    workId: string,
    introId: string,
    at: string,
    from: string,
    to: string,
    publicState: boolean
  ): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.editWorkApi}`, {
      IdUser: userId,
      IdWorking: workId,
      IdUserIntro: introId,
      WorkingAt: at,
      WorkFrom: from,
      WorkTo: to == '2020' || to == null ? null : to,
      Status: publicState ? 1 : 2,
    })
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data == 1) {
              return true;
            } else {
              return false;
            }
          }
        )
      )
  }
  /*
  @ Is Follow
  */
  isFollow(userId: string, followUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.isFollowApi}`, {
      IdUser: userId,
      IdUserRequest: followUserId
    })
      .pipe(
        map(res => {
          return res.Data;
        })
      )
  }
  /*
  @ Is Friend
  */
  isFriend(userId: string, friendUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.isFriendApi}`, {
      IdUser: userId,
      IdUserFriend: friendUserId
    })
      .pipe(
        map(res => {
          return res.Data;
        })
      )
  }
  /*
  @ Sent Follow
  */
  sentFollow(userId: string, followUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.sentFollowApi}`, {
      IdUser: userId,
      IdUserRequest: followUserId
    })
      .pipe(
        map(res => {
          if (res.Data === 'created follow') {
            return true;
          } else {
            return false;
          }
        })
      )
  }
  /*
  @ Remove Follow
  */
  removeFollow(userId: string, followUserId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.removeFollowApi}`, {
      IdUser: userId,
      IdUserRequest: followUserId
    })
      .pipe(
        map(res => {
          if (res.Data === 'removed follow') {
            return true;
          } else {
            return false;
          }
        })
      )
  }
}

