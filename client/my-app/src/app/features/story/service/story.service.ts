import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
// Domain
import { domain } from './../../../shared/core/key/domain';
// Interface
import { MappedResponse } from './../../../shared/core/interface/mapped-respone.interface';
import { ResponseData } from 'src/app/shared/core/interface/response-data.interface';
import { Story } from '../core/interface/story.interface';
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
import { UserStory } from './../core/interface/user-story.interface';
// Helper
import { jsonMedias, jsonMedia } from 'src/app/shared/core/helper/json-media';
import { fullNameConcat } from 'src/app/shared/core/helper/fullname-concat';
import { getProfileUserLink } from 'src/app/shared/core/helper/get-profile-user-link';
import { calcTimeStory } from 'src/app/shared/core/helper/calc-time-story-minute';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private getStoryOfUserApi = domain + '/api/userstory/getstory';
  private getStorySeenQuantityApi = domain + '/api/userstory/quantityseen';
  private seeStoryApi = domain + '/api/userstory/createseen';
  private uploadStoryApi = domain + '/api/userstory/create';
  private deleteStoryApi = domain + '/api/userstory/deletestory';
  private getFriendStoryiesApi = domain + '/api/userstory/getstoryoffriends';
  private getSeenUsersStoryApi = domain + '/api/userstory/getinfouserseenstory';
  constructor(
    private httpClient: HttpClient
  ) { }
  /*
  @ Get story of user
  */
  getStoryOfUser(userId: string): Observable<Story[]> {
    return this.httpClient.get<ResponseData>(`${this.getStoryOfUserApi}?idUser=${userId}`)
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            return res.Data.map(item => {
              const story: Story = {
                id: item.IdStory,
                url: item.Content,
                backGround: item.Content,
                time: calcTimeStory(item.MinuteOfTime),
                type: item.TypeContent == 1 ? 'image' : 'video'
              }
              return story;
            })
          } else {
            return null;
          }
        })
      )
  };
  /*
  @ Get quantity seen of a story
  */
  getQuantitySeen(storyId: string): Observable<any> {
    return this.httpClient.get<ResponseData>(`${this.getStorySeenQuantityApi}?idStory=${storyId}`)
      .pipe(
        map(res => {
          if (res.Data !== null) {
            return res.Data;
          } else {
            return null;
          }
        })
      )
  };
  /*
  @ See story
  */
  seeStory(userId: string, storyId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.seeStoryApi}`, {
      IdStory: storyId,
      IdUser: userId
    })
      .pipe(
        map(res => {
          if (res.Data == 'failed') {
            return false;
          } else {
            return true;
          }
        })
      )
  }
  /*
  @ Upload stories
  */
  uploadStory(userId: string, story: Story): Observable<any> {
    return this.httpClient.post<MappedResponse>(`${this.uploadStoryApi}`, {
      IdUser: userId,
      Content: jsonMedia(story.url),
      TypeContent: story.type == 'image' ? 1 : 2,
    })
      .pipe(
        map(res => {
          if (res.Data !== 'failed') {
            return res.Data;
          } else {
            return null;
          }
        })
      )
  };
  /*
  @ Delete story
  */
  deleteStory(userId: string, storyId: string): Observable<boolean> {
    return this.httpClient.post<MappedResponse>(`${this.deleteStoryApi}`, {
      IdUser: userId,
      IdStory: storyId
    })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data == "Deleted Story") {
            return true;
          } else {
            return false;
          }
        })
      )
  }
  /*
  @ Get friend stories
  */
  getFriendStories(userId: string): Observable<UserStory[]> {
    return this.httpClient.get<MappedResponse>(`${this.getFriendStoryiesApi}?idUser=${userId}&take=${7}`)
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data) {
              return res.Data.map(item => {
                const userStory: UserStory = {
                  id: item.IdUser,
                  firstStory: item.Content,
                  newStorytime: null,
                  userInfo: {
                    userId: item.IdUser,
                    avatar: item.UserInfo.Avatar,
                    firstName: item.UserInfo.FirstName,
                    lastName: item.UserInfo.LastName,
                    fullName: fullNameConcat(item.UserInfo.FirstName + '   ' + item.UserInfo.LastName),
                    link: getProfileUserLink()
                  }
                }
                return userStory;
              })
            } else {
              return null;
            }
          }
        )
      )
  }
  /*
  @ Get seen users of story
  */
  getSeenUsersStory(storyId: string): Observable<UserInfo[]> {
    return this.httpClient.get<MappedResponse>(`${this.getSeenUsersStoryApi}?idStory=${storyId}`)
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data) {
              return res.Data.map(item => {
                const user: UserInfo = {
                  userId: item.IdUser,
                  avatar: item.Avatar,
                  firstName: item.FirstName,
                  lastName: item.LastName,
                  fullName: fullNameConcat(item.FirstName + '   ' + item.LastName),
                  link: null
                }
                return user;
              })
            }
            return null;
          }
        )
      )
  }
}
