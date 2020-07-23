import { getProfileUserLink } from 'src/app/shared/core/helper/get-profile-user-link';
import { fullNameConcat } from 'src/app/shared/core/helper/fullname-concat';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Rxjs
import { Observable, pipe } from 'rxjs';
import { map, delay } from 'rxjs/operators';
// Interface
import { ResponseData } from 'src/app/shared/core/interface/response-data.interface';
import { FullPost } from './../core/interface/post/full-post.interface';
import { Comment } from './../core/interface/comment/comment.interface';
import { PagingHeader } from './../../../shared/core/interface/header.interface';
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
// Domain
import { domain } from '../../../shared/core/key/domain';
// Helper
import { jsonMedias } from 'src/app/shared/core/helper/json-media';
import { MediaPost } from '../core/interface/post/media-post.interface';
import { Paging } from 'src/app/shared/core/type/paging.type';
import { ReplyComment } from '../core/interface/comment/reply-comment-interface';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private uploadPostApi = domain + '/api/newsfeed/postnews';
  private getPostsApi = domain + '/api/newsfeed/getnews';
  private getUserPostsApi = domain + '/api/newsfeed/getnewsbyuserid';
  private getUserMainPostsApi = domain + '/api/newsfeed/getpostofuser';
  private likePostApi = domain + '/api/newsfeed/createlike';
  private dislikePostApi = domain + '/api/newsfeed/removelike';
  private updatePostApi = domain + '/api/newsfeed/updatenews';
  private deletePostApi = domain + '/api/newsfeed/';
  private sharePostApi = domain + '/api/newsfeed/';
  private getLikedUserPostApi = domain + '/api/newsfeed/getuserslikeofpost'
  private getCommentsApi = domain + '/api/newsfeed/getcomments';
  private createCommentApi = domain + '/api/newsfeed/createcomment';
  private deleteCommentApi = domain + '/api/newsfeed/removecomment';
  private updateCommentApi = domain + '/api/newsfeed/updatecomment';
  private getReplyCommentsApi = domain + '/api/newsfeed/getreplycomments';
  private createReplyCommentApi = domain + '/api/newsfeed/createreplycomment';
  private deleteReplyCommentApi = domain + '/api/newsfeed/removereplycomment';
  private updateReplyCommentApi = domain + '/api/newsfeed/updatereplycomment';

  constructor(private httpClient: HttpClient) { }
  /*
  @ Upload post from create post
  @ Input: IdUser, Content, Images, Privacy
  @ Output (Observable): True, False
  */
  uploadPost(
    idUser: string,
    content: string,
    image: string[],
    privacy: number
  ): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.uploadPostApi}`,
      {
        IdUser: idUser,
        IdCategory: 1,
        Content: content,
        Location: null,
        Images: jsonMedias(image),
        StatusSocial: privacy,
      }
    ).pipe(
      map(res => {
        return res.Data === 'success' ? true : false;
      })
    );
  }
  /*
  @ Update post
  */
  updatePost(
    idUser: string,
    postId: string,
    content: string,
    image: string[],
    privacy: number
  ): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.updatePostApi}`,
      {
        IdUser: idUser,
        IdPost: postId,
        IdCategory: 1,
        Content: content,
        UpdateImages: jsonMedias(image),
        StatusSocial: privacy,
      }
    ).pipe(
      delay(500),
      map(res => {
        console.log(res);
        return res.Data === 'success' ? true : false;
      })
    );
  }
  /*
  @ Get posts
  @ Input: User Id
  @ Output (Observable): Post
  */
  getPosts(header: PagingHeader, userId: string): Observable<Paging<FullPost[]>> {
    const newHeaders = new HttpHeaders().set('Paging-NewsFeed', header ? JSON.stringify(header) : '');
    return this.httpClient.get<ResponseData>(`${this.getPostsApi}?idUser=${userId}`, { headers: newHeaders })
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data) {
              const posts: FullPost[] = res.Data.map(item => {
                const date = new Date(item.CreatedTS);
                const post: FullPost = {
                  id: item.IdPost,
                  content: item.Content,
                  privacy: item.StatusSocial == 2 ? 'private' : 'public',
                  createTime: date,
                  time: date.toLocaleString(),
                  userInfo: {
                    userId: item.IdUser,
                    firstName: item.UserInfo.FirstName,
                    lastName: item.UserInfo.LastName,
                    fullName: fullNameConcat(item.UserInfo.FirstName + '  ' + item.UserInfo.LastName),
                    avatar: item.UserInfo.Avatar,
                    link: getProfileUserLink()
                  },
                  isOwn: userId === item.IdUser ? true : false,
                  medias: item.ListImages ? item.ListImages.map(item => {
                    const media: MediaPost = {
                      type: 'image',
                      url: item,
                      thumnail: item
                    };
                    return media;
                  }) : null,
                  fourMedias: item.ListImages ? item.ListImages.splice(0, 4).map(item => {
                    const media: MediaPost = {
                      type: 'image',
                      url: item,
                      thumnail: item
                    };
                    return media;
                  }) : null,
                  liked: item.Liked,
                  quantityLike: item.QuantityLike,
                  quantityComment: item.QuantityComment,
                  quantityShare: 0
                };
                return post;
              });
              const data: Paging<FullPost[]> = {
                header: JSON.parse(res.ContentType),
                data: posts
              };
              return data;
            } else {
              return null;
            }
          }
        )
      );
  }
  /*
  @ Get posts of user
  @ Input: User Id
  @ Output (Observable): Post
  */
  getUserPosts(header: PagingHeader, userId: string, userOwnId: string): Observable<Paging<FullPost[]>> {
    const newHeaders = new HttpHeaders().set('Paging-NewsFeed', header ? JSON.stringify(header) : '');
    return this.httpClient.get<ResponseData>(`${this.getUserPostsApi}?idUser=${userId}`, { headers: newHeaders })
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data) {
              const posts: FullPost[] = res.Data.map(item => {
                const date = new Date(item.CreatedTS);
                const post: FullPost = {
                  id: item.IdPost,
                  content: item.Content,
                  privacy: item.StatusSocial === 2 ? 'private' : 'public',
                  createTime: date,
                  time: date.toLocaleString(),
                  userInfo: {
                    userId: item.IdUser,
                    firstName: item.UserInfo.FirstName,
                    lastName: item.UserInfo.LastName,
                    fullName: fullNameConcat(item.UserInfo.FirstName + '  ' + item.UserInfo.LastName),
                    avatar: item.UserInfo.Avatar,
                    link: getProfileUserLink()
                  },
                  isOwn: userId === userOwnId ? true : false,
                  medias: item.ListImages ? item.ListImages.map(item => {
                    const media: MediaPost = {
                      type: 'image',
                      url: item,
                      thumnail: item
                    };
                    return media;
                  }) : null,
                  fourMedias: item.ListImages ? item.ListImages.splice(0, 4).map(item => {
                    const media: MediaPost = {
                      type: 'image',
                      url: item,
                      thumnail: item
                    };
                    return media;
                  }) : null,
                  liked: item.Liked,
                  quantityLike: item.QuantityLike,
                  quantityComment: item.QuantityComment,
                  quantityShare: 0
                };
                return post;
              });
              const data: Paging<FullPost[]> = {
                header: JSON.parse(res.ContentType),
                data: posts
              };
              return data;
            } else {
              return null;
            }
          }
        )
      );
  }
  /*
 @ Get posts of main user
 @ Input: User Id
 @ Output (Observable): Post
 */
  getMainUserPosts(header: PagingHeader, userId: string, userOwnId: string): Observable<Paging<FullPost[]>> {
    const newHeaders = new HttpHeaders().set('Paging-NewsFeed', header ? JSON.stringify(header) : '');
    return this.httpClient.get<ResponseData>(`${this.getUserMainPostsApi}?idUser=${userId}`, { headers: newHeaders })
      .pipe(
        delay(500),
        map(
          res => {
            if (res.Data) {
              const posts: FullPost[] = res.Data.map(item => {
                const date = new Date(item.CreatedTS);
                const post: FullPost = {
                  id: item.IdPost,
                  content: item.Content,
                  privacy: item.StatusSocial === 2 ? 'private' : 'public',
                  createTime: date,
                  time: date.toLocaleString(),
                  userInfo: {
                    userId: item.IdUser,
                    firstName: item.UserInfo.FirstName,
                    lastName: item.UserInfo.LastName,
                    fullName: fullNameConcat(item.UserInfo.FirstName + '  ' + item.UserInfo.LastName),
                    avatar: item.UserInfo.Avatar,
                    link: getProfileUserLink()
                  },
                  isOwn: userId === userOwnId ? true : false,
                  medias: item.ListImages ? item.ListImages.map(item => {
                    const media: MediaPost = {
                      type: 'image',
                      url: item,
                      thumnail: item
                    };
                    return media;
                  }) : null,
                  fourMedias: item.ListImages ? item.ListImages.splice(0, 4).map(item => {
                    const media: MediaPost = {
                      type: 'image',
                      url: item,
                      thumnail: item
                    };
                    return media;
                  }) : null,
                  liked: item.Liked,
                  quantityLike: item.QuantityLike,
                  quantityComment: item.QuantityComment,
                  quantityShare: 0
                };
                return post;
              });
              const data: Paging<FullPost[]> = {
                header: JSON.parse(res.ContentType),
                data: posts
              };
              return data;
            } else {
              return null;
            }
          }
        )
      );
  }
  /*
  @ Like post
  */
  likePost(postId: string, userId: string): Observable<string> {
    return this.httpClient.post<ResponseData>(`${this.likePostApi}`, {
      IdPost: postId,
      IdUser: userId
    })
      .pipe(
        map(res => res.Data === 'liked' ? postId : null)
      )
  }
  /*
  @ Dislike post
  */
  dislikePost(postId: string, userId: string): Observable<string> {
    return this.httpClient.post<ResponseData>(`${this.dislikePostApi}`, {
      IdPost: postId,
      IdUser: userId
    })
      .pipe(
        map(res => res.Data === 'removed' ? postId : null)
      )
  }
  /*
  @ Get user like of post
  */
  getLikedUserPost(header: PagingHeader, postId: string): Observable<UserInfo> {
    const newHeaders = new HttpHeaders().set('Paging-Users-Like', header ? JSON.stringify(header) : '');
    return this.httpClient.get<ResponseData>(`${this.getLikedUserPostApi}?idPost=${postId}`, { headers: newHeaders })
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
  @ Get comments of post
  */
  getComment(header: PagingHeader, postId: string): Observable<Paging<Comment[]>> {
    const newHeaders = new HttpHeaders().set('Paging-Comments', header ? JSON.stringify(header) : '');
    return this.httpClient.get<ResponseData>(`${this.getCommentsApi}?idPost=${postId}`, { headers: newHeaders })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            const comments: Comment[] = res.Data.map(item => {
              const date = new Date(item.CreatedTS);
              const comment: Comment = {
                id: item.IdComment,
                idPost: item.IdPost,
                content: item.Content,
                createTime: date,
                time: date.toLocaleString(),
                quantityLike: 0,
                quantityReplyComment: item.ReplyComments,
                liked: null,
                userInfo: {
                  userId: item.IdUser,
                  firstName: item.UserInfo.FirstName,
                  lastName: item.UserInfo.LastName,
                  fullName: fullNameConcat(item.UserInfo.FirstName + '  ' + item.UserInfo.LastName),
                  avatar: item.UserInfo.Avatar,
                  link: getProfileUserLink()
                }
              };
              return comment;
            })
            const data: Paging<Comment[]> = {
              header: JSON.parse(res.ContentType),
              data: comments
            }
            return data;
          }
        })
      )
  }
  /*
  @ Create Comment
  */
  createComment(userInfo: UserInfo, postId: string, content: string, image: string[] = null): Observable<Comment> {
    return this.httpClient.post<ResponseData>(`${this.createCommentApi}`, {
      IdUser: userInfo.userId,
      IdPost: postId,
      Content: content
    })
      .pipe(
        map(res => {
          if (res.Data !== 'failed') {
            const newComment: Comment = {
              id: res.Data,
              content: content,
              createTime: new Date(),
              time: 'vừa xong',
              idPost: postId,
              liked: false,
              quantityLike: 0,
              quantityReplyComment: 0,
              userInfo: userInfo
            };
            return newComment;
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Delete comment
  */
  deleteComment(userId: string, commentId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.deleteCommentApi}`, {
      IdUser: userId,
      IdComment: commentId
    })
      .pipe(
        delay(500),
        map(res => res.Data === 'Deleted comment' ? true : false)
      )
  }
  /*
  @ Update Comment
  */
  updateComment(userId: string, commentId: string, content: string): Observable<string> {
    return this.httpClient.post<ResponseData>(`${this.updateCommentApi}`, {
      IdUser: userId,
      IdComment: commentId,
      Content: content
    })
      .pipe(
        map(res => res.Data === 'success' ? commentId : null)
      )
  }
  /*
  @ Get reply comment
  */
  getReplyComments(header: PagingHeader, commentId: string): Observable<Paging<ReplyComment[]>> {
    const newHeaders = new HttpHeaders().set('Paging-Reply-Comments', header ? JSON.stringify(header) : '');
    return this.httpClient.get<ResponseData>(`${this.getReplyCommentsApi}?idComment=${commentId}`, { headers: newHeaders })
      .pipe(
        delay(500),
        map(res => {
          if (res.Data) {
            const comments: ReplyComment[] = res.Data.map(item => {
              const date = new Date(item.CreatedTS);
              const comment: ReplyComment = {
                id: item.IdReply,
                commentId: item.IdComment,
                content: item.Content,
                createTime: item.CreatedTS,
                time: date.toLocaleString(),
                userInfo: {
                  userId: item.IdUser,
                  firstName: item.UserInfo.FirstName,
                  lastName: item.UserInfo.LastName,
                  fullName: fullNameConcat(item.UserInfo.FirstName + '  ' + item.UserInfo.LastName),
                  avatar: item.UserInfo.Avatar,
                  link: getProfileUserLink()
                }
              };
              return comment;
            })
            const data: Paging<ReplyComment[]> = {
              header: JSON.parse(res.ContentType),
              data: comments
            }
            return data;
          }
        })
      )
  }
  /*
  @ Create reply comment
  */
  createReplyComment(userInfo: UserInfo, commentId: string, content: string, image: string[] = null): Observable<ReplyComment> {
    return this.httpClient.post<ResponseData>(`${this.createReplyCommentApi}`, {
      IdUser: userInfo.userId,
      IdComment: commentId,
      Content: content
    })
      .pipe(
        map(res => {
          if (res.Data !== 'failed') {
            const newComment: ReplyComment = {
              id: res.Data,
              commentId: commentId,
              content: content,
              createTime: new Date(),
              time: 'vừa xong',
              userInfo: userInfo
            };
            return newComment;
          } else {
            return null;
          }
        })
      )
  }
  /*
  @ Delete reply comment
  */
  deleteReplyComment(userId: string, replyCommentId: string): Observable<boolean> {
    return this.httpClient.post<ResponseData>(`${this.deleteReplyCommentApi}`, {
      IdUser: userId,
      IdReply: replyCommentId
    })
      .pipe(
        delay(500),
        map(res => res.Data === 'removed succsess' ? true : false)
      )
  }
  /*
  @ Update Reply Comment
  */
  updateReplyComment(userId: string, replyCommentId: string, content: string): Observable<string> {
    return this.httpClient.post<ResponseData>(`${this.updateReplyCommentApi}`, {
      IdUser: userId,
      IdReply: replyCommentId,
      Content: content
    })
      .pipe(
        map(res => res.Data === 'updated succsess' ? replyCommentId : null)
      )
  }
}
