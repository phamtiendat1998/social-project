import { Component, OnInit, OnDestroy } from '@angular/core';
// Rxjs
import { Observable, Subscription, concat } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// Mat
import { MatDialogRef } from '@angular/material/dialog';
// Interface
import { Story } from '../../core/interface/story.interface';
import { UserStory } from '../../core/interface/user-story.interface';
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { SelectStory } from '../../state/story.actions';
import { selectAllFriendStories, selectAllUserStory, selectHasStoryUserId } from '../../state/story.selectors';
import { selectUserInfo } from 'src/app/core/state/user-auth/user-auth.selectors';
// Service
import { StoryService } from './../../service/story.service';

@Component({
  selector: 'app-dialog-story-view',
  templateUrl: './dialog-story-view.component.html',
  styleUrls: ['./dialog-story-view.component.scss']
})
export class DialogStoryViewComponent implements OnInit, OnDestroy {
  friendStories$: Observable<UserStory[]>;
  userStory$: Observable<Story[]>;
  userInfo$: Observable<UserInfo>;
  subHasStoryUserId$: Subscription;
  hasStoryUserId: string;
  stories: Story[] = [];
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<DialogStoryViewComponent>,
    private store$: Store<AppState>,
    private storyService: StoryService
  ) { }

  ngOnInit(): void {
    this.friendStories$ = this.store$.pipe(select(selectAllFriendStories));
    this.userStory$ = this.store$.pipe(select(selectAllUserStory));
    this.userInfo$ = this.store$.pipe(select(selectUserInfo));
    this.subHasStoryUserId$ = this.store$.pipe(select(selectHasStoryUserId))
      .pipe(
        mergeMap(userId => {
          this.loading = true;
          if (userId !== null) {
            this.hasStoryUserId = userId;
            return this.storyService.getStoryOfUser(userId);
          } else {
            this.hasStoryUserId = null;
            return this.store$.pipe(select(selectAllUserStory));
          }
        })
      )
      .subscribe(stories => {
        this.loading = false;
        this.stories = stories ? [...stories] : null;
      })
  }
  ngOnDestroy() {
    this.subHasStoryUserId$.unsubscribe();
  }
  /*
  @ Event close dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Event select story
  */
  onSelectStory(userId: string = null) {
    this.store$.dispatch(new SelectStory({ id: userId }));
  }
}
