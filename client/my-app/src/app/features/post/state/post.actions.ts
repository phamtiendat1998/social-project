import { Action } from '@ngrx/store';
// Interface
import { Comment } from './../core/interface/comment/comment.interface';
import { FullPost } from './../core/interface/post/full-post.interface';
import { ReplyComment } from '../core/interface/comment/reply-comment-interface';
import { QuantityInteractivePost } from '../core/interface/post/quantity-interactive-post.interface';

export enum PostActionTypes {
  AddPosts = '[Post] Add Posts',
  AddInteractivePosts = '[Post] Add Interactive Posts',
  LikePost = '[Post] Like Posts',
  DislikePost = '[Post] Dislike Posts',
  LikePostSuccess = '[Post] Like Posts Success',
  DislikePostSuccess = '[Post] Dislike Posts Success',
  DeletePost = '[Post] Delete Posts',
  UpdatePost = '[Post] Update Posts',
  LoadComments = '[Post] Load Comments',
  AddComment = '[Post] Add Comment',
  AddComments = '[Post] Add Comments',
  DeleteComment = '[Post] Delete Comment',
  UpdateComment = '[Post] Update Comment',
  AddReplyComment = '[Post] Add Reply Comment',
  AddReplyComments = '[Post] Add Reply Comments',
  DeleteReplyComment = '[Post] Delete Reply Comment',
  UpdateReplyComment = '[Post] Update Reply Comment',
  ResetPosts = '[Post] Reset Posts',
}

export class AddPosts implements Action {
  readonly type = PostActionTypes.AddPosts;
  constructor(public payload: { posts: FullPost[] }) { }
}

export class AddInteractivePosts implements Action {
  readonly type = PostActionTypes.AddInteractivePosts;
  constructor(public payload: { quantityInteractivePost: QuantityInteractivePost[] }) { }
}

export class LikePost implements Action {
  readonly type = PostActionTypes.LikePost;
  constructor(public payload: { postId: string }) { }
}

export class DislikePost implements Action {
  readonly type = PostActionTypes.DislikePost;
  constructor(public payload: { postId: string }) { }
}

export class LikePostSuccess implements Action {
  readonly type = PostActionTypes.LikePostSuccess;
  constructor(public payload: { postId: string }) { }
}

export class DislikePostSuccess implements Action {
  readonly type = PostActionTypes.DislikePostSuccess;
  constructor(public payload: { postId: string }) { }
}

export class DeletePost implements Action {
  readonly type = PostActionTypes.DeletePost;
  constructor(public payload: { postId: string }) { }
}

export class UpdatePost implements Action {
  readonly type = PostActionTypes.UpdatePost;
  constructor(public payload: { post: FullPost[] }) { }
}

export class LoadComments implements Action {
  readonly type = PostActionTypes.LoadComments;
  constructor(public payload: { postId: string }) { }
}

export class AddComment implements Action {
  readonly type = PostActionTypes.AddComment;
  constructor(public payload: { postId: string, comment: Comment }) { }
}

export class AddComments implements Action {
  readonly type = PostActionTypes.AddComments;
  constructor(public payload: { postId: string, comments: Comment[] }) { }
}

export class DeleteComment implements Action {
  readonly type = PostActionTypes.DeleteComment;
  constructor(public payload: { commentId: string }) { }
}

export class UpdateComment implements Action {
  readonly type = PostActionTypes.UpdateComment;
  constructor(public payload: { commentId: string, content: string }) { }
}

export class AddReplyComment implements Action {
  readonly type = PostActionTypes.AddReplyComment;
  constructor(public payload: { commentId: string, comment: ReplyComment }) { }
}

export class AddReplyComments implements Action {
  readonly type = PostActionTypes.AddReplyComments;
  constructor(public payload: { commentId: string, comments: ReplyComment[] }) { }
}

export class DeleteReplyComment implements Action {
  readonly type = PostActionTypes.DeleteReplyComment;
  constructor(public payload: { replyCommentId: string }) { }
}

export class UpdateReplyComment implements Action {
  readonly type = PostActionTypes.UpdateReplyComment;
  constructor(public payload: { replyCommentId: string, content: string }) { }
}

export class ResetPosts implements Action {
  readonly type = PostActionTypes.ResetPosts;
}

export type PostActions =
  AddPosts |
  AddInteractivePosts |
  LikePost |
  DislikePost |
  LikePostSuccess |
  DislikePostSuccess |
  LoadComments |
  AddComment |
  AddComments |
  DeleteComment |
  UpdateComment |
  AddReplyComment |
  AddReplyComments |
  DeleteReplyComment |
  UpdateReplyComment |
  ResetPosts;
