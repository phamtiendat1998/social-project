import { ResetStory } from './../../state/story.actions';
import { selectNoStories } from './../../state/story.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
// Rxjs
import { Observable, Subscription, forkJoin } from 'rxjs';
import { map, filter } from 'rxjs/operators';
// Animation
import { trigger } from '@angular/animations';
import { fadeIn } from 'src/app/shared/core/animation/fade-in.animation';
// Mat
import { MatDialog } from '@angular/material/dialog';
// Dialog
import { DialogCreateStoryComponent } from '../dialog-create-story/dialog-create-story.component';
import { DialogStoryViewComponent } from './../dialog-story-view/dialog-story-view.component';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { SaveUserStory, SaveFriendStories, SelectStory } from '../../state/story.actions';
import { selectUserId, selectAvatar, selectUserInfo } from 'src/app/core/state/user-auth/user-auth.selectors';
import { selectAllUserStory, selectAllFriendStories } from '../../state/story.selectors';
// Service
import { StoryService } from './../../service/story.service';
// Interface
import { Story } from '../../core/interface/story.interface';
import { UserStory } from '../../core/interface/user-story.interface';

@Component({
  selector: 'app-story-tab',
  templateUrl: './story-tab.component.html',
  styleUrls: ['./story-tab.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class StoryTabComponent implements OnInit, OnDestroy {
  subUserId$: Subscription;
  userId: string;
  userAvatar$: Observable<string>;
  userStory$: Observable<Story[]>;
  friendStories$: Observable<UserStory[]>;
  noStories$: Observable<number[]>;
  loading = false;
  constructor(
    public dialog: MatDialog,
    private store$: Store<AppState>,
    private storyService: StoryService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.userAvatar$ = this.store$.pipe(select(selectAvatar));
    this.userStory$ = this.store$.pipe(select(selectAllUserStory));
    this.friendStories$ = this.store$.pipe(select(selectAllFriendStories));
    forkJoin([
      this.storyService.getStoryOfUser(this.userId),
      this.storyService.getFriendStories(this.userId)
    ]).subscribe(res => {
      this.loading = false;
      this.store$.dispatch(new SaveUserStory({ story: res[0] ? res[0] : [] }));
      this.store$.dispatch(new SaveFriendStories({ stories: res[1] ? res[1] : [] }));
    });
    this.noStories$ = this.store$.pipe(select(selectNoStories));
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
    this.store$.dispatch(new ResetStory())
  }
  /*
  @ Event open dialog create story
  */
  onClickOpenDialogCreateStory() {
    this.dialog.open(DialogCreateStoryComponent, {
      width: '680px',
      maxHeight: '80vh',
    });
  }
  /*
  @ Open dialog story view
  @ Input: Story Object
  */
  onClickOpenDialogStoryView(storyId: string = null) {
    this.store$.dispatch(new SelectStory({ id: storyId }));
    this.dialog.open(DialogStoryViewComponent, {
      maxWidth: '100vw',
      width: '100vw',
      height: '100vh',
    });
  }
}
