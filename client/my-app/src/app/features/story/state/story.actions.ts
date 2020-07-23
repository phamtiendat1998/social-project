import { Action } from '@ngrx/store';
// Interface
import { UserStory } from '../core/interface/user-story.interface';
import { Story } from './../core/interface/story.interface';

export enum StoryActionTypes {
  SaveUserStory = '[Story] Save User Story',
  AddUserStory = '[Story] Add User Story',
  SaveFriendStories = '[Story] Save Friend Stories',
  SelectStory = '[Story] Select Story',
  NextStory = '[Story] Next Story',
  PrevStory = '[Story] Prev Story',
  DeleteUserStory = '[Story] Delete User Story',
  ResetStory = '[Story] Reset Story',
}

export class PrevStory implements Action {
  readonly type = StoryActionTypes.PrevStory;
}

export class NextStory implements Action {
  readonly type = StoryActionTypes.NextStory;
}

export class DeleteUserStory implements Action {
  readonly type = StoryActionTypes.DeleteUserStory;
  constructor(public payload: { storyId: string }) { }
}

export class SaveUserStory implements Action {
  readonly type = StoryActionTypes.SaveUserStory;
  constructor(public payload: { story: Story[] }) { }
}

export class AddUserStory implements Action {
  readonly type = StoryActionTypes.AddUserStory;
  constructor(public payload: { story: Story }) { }
}

export class SaveFriendStories implements Action {
  readonly type = StoryActionTypes.SaveFriendStories;
  constructor(public payload: { stories: UserStory[] }) { }
}

export class SelectStory implements Action {
  readonly type = StoryActionTypes.SelectStory;
  constructor(public payload: { id: string }) { }
}

export class ResetStory implements Action {
  readonly type = StoryActionTypes.ResetStory;
}

export type StoryActions =
  SaveUserStory |
  AddUserStory |
  SaveFriendStories |
  SelectStory |
  PrevStory |
  NextStory |
  DeleteUserStory |
  ResetStory;

