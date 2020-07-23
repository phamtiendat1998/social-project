import { PostActionTypes, PostActions } from './post.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
// Interface
import { FullPost } from '../core/interface/post/full-post.interface';
import { Comment } from './../core/interface/comment/comment.interface';
import { CommentOfPost } from '../core/interface/comment/comment-of-post.interface';
import { CommentOfComment } from './../core/interface/comment/comment-of-comment.interface';
import { ReplyComment } from '../core/interface/comment/reply-comment-interface';
import { QuantityInteractivePost } from '../core/interface/post/quantity-interactive-post.interface';
import { QuantityInteractiveComment } from './../core/interface/comment/quantity-interactive-comment.interface';

export const postFeatureKey = 'post';

export interface HomePostState extends EntityState<FullPost> {
}
export interface CommentState extends EntityState<Comment> {
}
export interface CommentOfPostState extends EntityState<CommentOfPost> {
}
export interface ReplyCommentState extends EntityState<ReplyComment> {
}
export interface ReplyCommentOfCommentState extends EntityState<CommentOfComment> {
}
export interface QuantityInteractivePostState extends EntityState<QuantityInteractivePost> {
}
export interface QuantityInteractiveCommentState extends EntityState<QuantityInteractiveComment> {
}
export interface PostState {
  homePost: HomePostState;
  comment: CommentState;
  commentOfPost: CommentOfPostState;
  replyComment: ReplyCommentState;
  replyCommentOfComment: ReplyCommentOfCommentState;
  quantityInteractivePost: QuantityInteractivePostState;
  quantityInteractiveComment: QuantityInteractiveCommentState;
}

export const adapterHomePost: EntityAdapter<FullPost> = createEntityAdapter<FullPost>();
export const adapterComment: EntityAdapter<Comment> = createEntityAdapter<Comment>();
export const adapterCommentOfPost: EntityAdapter<CommentOfPost> = createEntityAdapter<CommentOfPost>();
export const adapterReplyComment: EntityAdapter<ReplyComment> = createEntityAdapter<ReplyComment>();
export const adapterReplyCommentOfComment: EntityAdapter<CommentOfComment> = createEntityAdapter<CommentOfComment>();
export const adapterQuantityInteractivePost: EntityAdapter<QuantityInteractivePost> = createEntityAdapter<QuantityInteractivePost>();
export const adapterQuantityInteractiveComment: EntityAdapter<QuantityInteractiveComment> = createEntityAdapter<QuantityInteractiveComment>();

export const initialHomePostState: HomePostState = adapterHomePost.getInitialState({
});
export const initialCommentState: CommentState = adapterComment.getInitialState({
});
export const initialCommentOfPostState: CommentOfPostState = adapterCommentOfPost.getInitialState({
});
export const initialReplyCommentState: ReplyCommentState = adapterReplyComment.getInitialState({
});
export const initialReplyCommentOfCommentState: ReplyCommentOfCommentState = adapterReplyCommentOfComment.getInitialState({
});
export const initialQuantityInteractivePostState: QuantityInteractivePostState = adapterQuantityInteractivePost.getInitialState({
});
export const initialQuantityInteractiveCommentState: QuantityInteractiveCommentState = adapterQuantityInteractiveComment.getInitialState({
});

export const initialPostState: PostState = {
  homePost: initialHomePostState,
  comment: initialCommentState,
  commentOfPost: initialCommentOfPostState,
  replyComment: initialReplyCommentState,
  replyCommentOfComment: initialReplyCommentOfCommentState,
  quantityInteractivePost: initialQuantityInteractivePostState,
  quantityInteractiveComment: initialQuantityInteractiveCommentState
}

export function reducer(state: PostState = initialPostState, action: PostActions): PostState {
  switch (action.type) {
    case PostActionTypes.AddPosts:
      return {
        ...state,
        homePost: adapterHomePost.addMany(action.payload.posts, state.homePost),
        quantityInteractivePost: adapterQuantityInteractivePost.addMany(
          action.payload.posts.map(item => {
            const quantity: QuantityInteractivePost = {
              id: item.id,
              quantityLike: item.quantityLike,
              quantityComment: item.quantityComment,
              quantityShare: item.quantityShare,
              liked: item.liked
            };
            return quantity;
          }),
          state.quantityInteractivePost
        )
      }
    case PostActionTypes.LikePostSuccess:
      return {
        ...state,
        quantityInteractivePost: adapterQuantityInteractivePost.updateOne({ id: action.payload.postId, changes: { quantityLike: state.quantityInteractivePost.entities[action.payload.postId].quantityLike + 1, liked: true } }, state.quantityInteractivePost)
      };
    case PostActionTypes.DislikePostSuccess:
      return {
        ...state,
        quantityInteractivePost: adapterQuantityInteractivePost.updateOne({ id: action.payload.postId, changes: { quantityLike: state.quantityInteractivePost.entities[action.payload.postId].quantityLike - 1, liked: false } }, state.quantityInteractivePost)
      };
    case PostActionTypes.AddComment:
      return {
        ...state,
        comment: adapterComment.addOne(action.payload.comment, state.comment),
        commentOfPost: state.commentOfPost.ids.indexOf(action.payload.postId as never) > -1 ?
          adapterCommentOfPost.updateOne({ id: action.payload.postId, changes: { commentIds: [...state.commentOfPost.entities[action.payload.postId].commentIds, action.payload.comment.id] } }, state.commentOfPost) :
          adapterCommentOfPost.addOne({ id: action.payload.postId, commentIds: [action.payload.comment.id] } as CommentOfPost, state.commentOfPost),
        quantityInteractivePost: adapterQuantityInteractivePost.updateOne({ id: action.payload.postId, changes: { quantityComment: state.quantityInteractivePost.entities[action.payload.postId].quantityComment + 1 } }, state.quantityInteractivePost)
      };
    case PostActionTypes.AddComments:
      return {
        ...state,
        comment: adapterComment.addMany(action.payload.comments, state.comment),
        commentOfPost: adapterCommentOfPost.addOne({ id: action.payload.postId, commentIds: action.payload.comments.map(item => item.id) } as CommentOfPost, state.commentOfPost),
        quantityInteractiveComment: adapterQuantityInteractiveComment.addMany(
          action.payload.comments.map(item => {
            const quantity: QuantityInteractiveComment = {
              id: item.id,
              quantityLike: item.quantityLike,
              quantityReplyComment: item.quantityReplyComment,
              liked: item.liked
            };
            return quantity;
          }),
          state.quantityInteractiveComment
        ),

      };
    case PostActionTypes.DeleteComment:
      return {
        ...state,
        comment: adapterComment.removeOne(action.payload.commentId, state.comment),
      }
    case PostActionTypes.UpdateComment:
      return {
        ...state,
        comment: adapterComment.updateOne({ id: action.payload.commentId, changes: { content: action.payload.content } }, state.comment)
      }
    case PostActionTypes.AddReplyComment:
      return {
        ...state,
        replyComment: adapterReplyComment.addOne(action.payload.comment, state.replyComment),
        replyCommentOfComment: state.replyCommentOfComment.ids.indexOf(action.payload.commentId as never) > -1 ?
          adapterReplyCommentOfComment.updateOne({ id: action.payload.commentId, changes: { commentIds: [...state.replyCommentOfComment.entities[action.payload.commentId].commentIds, action.payload.comment.id] } }, state.replyCommentOfComment) :
          adapterReplyCommentOfComment.addOne({ id: action.payload.commentId, commentIds: [action.payload.comment.id] } as CommentOfComment, state.replyCommentOfComment)
      };
    case PostActionTypes.AddReplyComments:
      return {
        ...state,
        replyComment: adapterReplyComment.addMany(action.payload.comments, state.replyComment),
        replyCommentOfComment: adapterReplyCommentOfComment.addOne({ id: action.payload.commentId, commentIds: action.payload.comments.map(item => item.id) } as CommentOfComment, state.replyCommentOfComment)
      };
    case PostActionTypes.DeleteReplyComment:
      return {
        ...state,
        replyComment: adapterReplyComment.removeOne(action.payload.replyCommentId, state.replyComment)
      }
    case PostActionTypes.UpdateReplyComment:
      return {
        ...state,
        replyComment: adapterReplyComment.updateOne({ id: action.payload.replyCommentId, changes: { content: action.payload.content } }, state.replyComment)
      }
    case PostActionTypes.ResetPosts:
      return {
        homePost: adapterHomePost.removeAll(state.homePost),
        comment: adapterComment.removeAll(state.comment),
        commentOfPost: adapterCommentOfPost.removeAll(state.commentOfPost),
        replyComment: adapterReplyComment.removeAll(state.replyComment),
        replyCommentOfComment: adapterReplyCommentOfComment.removeAll(state.replyCommentOfComment),
        quantityInteractivePost: adapterQuantityInteractivePost.removeAll(state.quantityInteractivePost),
        quantityInteractiveComment: adapterQuantityInteractiveComment.removeAll(state.quantityInteractiveComment),
      }
    default:
      return state;
  }
}

export const {
  selectIds: selectHomePostIds,
  selectEntities: selectHomePostEntities,
  selectAll: selectHomePostAll
} = adapterHomePost.getSelectors();