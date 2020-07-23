import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStory from "./story.reducer";

export const selectStoriesState = createFeatureSelector<fromStory.StoryState>('story');
export const selectUserStoryState = createSelector(selectStoriesState, (state: fromStory.StoryState) => state.userStory);
export const selectFriendStoriesState = createSelector(selectStoriesState, (state: fromStory.StoryState) => state.friendStories);

export const selectAllUserStory = createSelector(
    selectUserStoryState,
    fromStory.selectAllUserStory
)

export const selectAllFriendStories = createSelector(
    selectFriendStoriesState,
    fromStory.selectAllFriendStories
)

export const selectHasStoryUserId = createSelector(
    selectStoriesState,
    state => state.selectHasStoryUserId
)
export const selectNoStories = createSelector(
    selectStoriesState,
    state => Array.from(Array(state.quantityNoStory).keys())
)