import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPost from "./post.reducer";

export const selectPostState = createFeatureSelector<fromPost.PostState>('post');
export const selectHomePostState = createSelector(selectPostState, (state: fromPost.PostState) => state.homePost);
export const selectCommentState = createSelector(selectPostState, (state: fromPost.PostState) => state.comment);
export const selectCommentOfPostState = createSelector(selectPostState, (state: fromPost.PostState) => state.commentOfPost);
export const selectReplyCommentState = createSelector(selectPostState, (state: fromPost.PostState) => state.replyComment);
export const selectReplyCommentOfCommentState = createSelector(selectPostState, (state: fromPost.PostState) => state.replyCommentOfComment);
export const selectQuantityInteractivePostState = createSelector(selectPostState, (state: fromPost.PostState) => state.quantityInteractivePost);
export const selectQuantityInteractiveCommentState = createSelector(selectPostState, (state: fromPost.PostState) => state.quantityInteractiveComment);


export const selectHomePosts = createSelector(
    selectHomePostState,
    fromPost.selectHomePostAll
)
export const selectPost = createSelector(
    selectHomePostState,
    (state: fromPost.HomePostState, props) => {
        return state.entities[props.id];
    }
)
export const selectCommentsOfPost = createSelector(
    selectCommentOfPostState,
    (commentOfPostState: fromPost.CommentOfPostState, props) => {
        return commentOfPostState.entities[props.id] ? commentOfPostState.entities[props.id].commentIds : null;
    }
)

export const selectCommentPost = createSelector(
    selectCommentState,
    (state: fromPost.CommentState, props) => state.entities[props.id] ? state.entities[props.id] : null
)

export const selectCommentsOfComment = createSelector(
    selectReplyCommentOfCommentState,
    (replyCommentOfCommentState: fromPost.ReplyCommentOfCommentState, props) => {
        return replyCommentOfCommentState.entities[props.id] ? replyCommentOfCommentState.entities[props.id].commentIds : null;
    }
)

export const selectReplyComment = createSelector(
    selectReplyCommentState,
    (state: fromPost.ReplyCommentState, props) => state.entities[props.id] ? state.entities[props.id] : null
)

export const selectQuantityInteractivePost = createSelector(
    selectQuantityInteractivePostState,
    (state: fromPost.QuantityInteractivePostState, props) => state.entities[props.id] ? state.entities[props.id] : null
)

export const selectQuantityInteractiveComment = createSelector(
    selectQuantityInteractiveCommentState,
    (state: fromPost.QuantityInteractiveCommentState, props) => state.entities[props.id] ? state.entities[props.id] : null
)