import { StoryActions, StoryActionTypes } from './story.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Story } from '../core/interface/story.interface';
import { UserStory } from '../core/interface/user-story.interface';

export const storyFeatureKey = 'story';

export interface FriendStoriesState extends EntityState<UserStory> {
}
export interface UserStoryState extends EntityState<Story> {
}
export interface StoryState {
  friendStories: FriendStoriesState,
  userStory: UserStoryState,
  selectHasStoryUserId: string,
  selectUserIndex: number,
  quantityNoStory: number
}

export const adapterFriendStories: EntityAdapter<UserStory> = createEntityAdapter<UserStory>();
export const adapterUserStory: EntityAdapter<Story> = createEntityAdapter<Story>();

export const initialFriendStoriesState: FriendStoriesState = adapterFriendStories.getInitialState({
});
export const initialUserStoryState: UserStoryState = adapterUserStory.getInitialState({
});
export const initialStoryState: StoryState = {
  friendStories: initialFriendStoriesState,
  userStory: initialUserStoryState,
  selectHasStoryUserId: null,
  selectUserIndex: null,
  quantityNoStory: 0
}

export function reducer(state: StoryState = initialStoryState, action: StoryActions): StoryState {
  switch (action.type) {
    case StoryActionTypes.SaveUserStory:
      return { ...state, userStory: adapterUserStory.setAll(action.payload.story, state.userStory), quantityNoStory: action.payload.story.length > 0 ? state.quantityNoStory : state.quantityNoStory + 1 };
    case StoryActionTypes.AddUserStory:
      return { ...state, userStory: adapterUserStory.addOne(action.payload.story, state.userStory), quantityNoStory: state.userStory.ids.length > 0 ? state.quantityNoStory : state.quantityNoStory - 1 };
    case StoryActionTypes.DeleteUserStory:
      return { ...state, userStory: adapterUserStory.removeOne(action.payload.storyId, state.userStory), quantityNoStory: state.userStory.ids.length > 0 ? state.quantityNoStory : state.quantityNoStory + 1 };
    case StoryActionTypes.SaveFriendStories:
      return { ...state, friendStories: adapterFriendStories.setAll(action.payload.stories, state.friendStories), quantityNoStory: state.quantityNoStory + (6 - action.payload.stories.length) };
    case StoryActionTypes.SelectStory:
      return { ...state, selectHasStoryUserId: action.payload.id };
    case StoryActionTypes.PrevStory:
      if (state.selectUserIndex === 0) {
        return { ...state, selectUserIndex: null, selectHasStoryUserId: null };
      } else if (state.selectUserIndex === null) {
        return state;
      } else {
        return { ...state, selectUserIndex: state.selectUserIndex - 1, selectHasStoryUserId: state.friendStories.ids[state.selectUserIndex - 1] as string };
      }
    case StoryActionTypes.NextStory:
      if (state.selectUserIndex === state.friendStories.ids.length - 1) {
        return state;
      } else if (state.selectUserIndex === null) {
        return { ...state, selectUserIndex: 0, selectHasStoryUserId: state.friendStories.ids[0] as string };
      } else {
        return { ...state, selectUserIndex: state.selectUserIndex + 1, selectHasStoryUserId: state.friendStories.ids[state.selectUserIndex + 1] as string };
      }
    case StoryActionTypes.ResetStory:
      return initialStoryState;
    default:
      return state;
  }
}

export const {
  selectIds: selectUserStoryIds,
  selectEntities: selectEntitiesUserStory,
  selectAll: selectAllUserStory
} = adapterUserStory.getSelectors();

export const {
  selectIds: selectFriendStoriesIds,
  selectEntities: selectEntitiesFriendStories,
  selectAll: selectAllFriendStories
} = adapterFriendStories.getSelectors();