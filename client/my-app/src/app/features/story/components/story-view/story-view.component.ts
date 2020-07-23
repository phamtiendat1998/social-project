import { Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
// Rxjs
import { Observable, Subscription, Subject, of } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';
// Mat
import { DialogSeenUsersStoryComponent } from './../dialog-seen-users-story/dialog-seen-users-story.component';
import { DialogDeleteStoryComponent } from './../dialog-delete-story/dialog-delete-story.component';
// Interface
import { Story } from '../../core/interface/story.interface';
// Store
import { AppState } from 'src/app/core/state';
import { NextStory, PrevStory } from './../../state/story.actions';
import { Store, select } from '@ngrx/store';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Service
import { StoryService } from './../../service/story.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-story-view',
  templateUrl: './story-view.component.html',
  styleUrls: ['./story-view.component.scss']
})
export class StoryViewComponent implements OnInit, OnDestroy, OnChanges {
  @Input() preview = false;
  @Input() owned = false;
  @Input() stories: Story[] = [];
  @Input() loading: boolean;
  @Output() deleteMedia = new EventEmitter();
  subUserId$: Subscription;
  userId: string;
  autoPlay: boolean;
  mute = false;
  storyMediaTimer = 0;
  storyMediaMaxTimer = 1000;
  storyMediaPercentTimer = 0;
  storyMediaInterval: any;
  // Upgrage observable
  storySelected$: Observable<Story>;
  storySelected: Story;
  private storySelectedSubject$ = new Subject<Story>();
  storyMediaSelectedIndex = 0;
  // Quantity Seen
  quantitySeen = 0;
  constructor(
    private store$: Store<AppState>,
    private storyService: StoryService,
    public dialog: MatDialog,
  ) {
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.storySelected$ = this.storySelectedSubject$.asObservable();
    this.storySelected$
      .pipe(
        mergeMap(story => {
          if (story !== undefined) {
            this.resetTimer();
            this.stopAutoPlay();
            this.setAutoPlay();
            if (this.owned) {
              return this.storyService.getQuantitySeen(story.id);
            } else {
              return this.storyService.seeStory(this.userId, story.id);
            }
          } else {
            this.stopAutoPlay();
            return of(null);
          }
        })
      )
      .subscribe((res) => {
        if (this.owned && res !== null) {
          this.quantitySeen = res;
        }
      });
  }
  /*
  @ Flow
  @ 1. Khi init đồng nghĩa là đã có story source
  @ --> Load story ra viewer
  @ 2. Khi story thay đổi -> load story
  @ 3. Subcrible vào Obs để theo dõi mỗi lần thay đổi sẽ: 
  @ --> 1. Reset timer
  @ --> 2. Stop intervale
  @ --> 3. Set intervale
  @ --> 4. Nếu owned thì gọi quantity seen api, không thì gọi seen api
  */
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.stopAutoPlay();
    this.subUserId$.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.stories) {
      this.resetViewer();
      this.loadStory();
    } else {
      return;
    }
  }
  /*
  @ Load story
  */
  loadStory() {
    this.storySelectedSubject$.next(this.stories[this.storyMediaSelectedIndex]);
    this.storySelected = this.stories[this.storyMediaSelectedIndex];
  }
  /*
  @ Reset viewer
  */
  resetViewer() {
    this.storyMediaSelectedIndex = 0;
  }
  /*
  @ Reset timer
  */
  resetTimer() {
    this.autoPlay = true;
    this.storyMediaPercentTimer = 0;
    this.storyMediaTimer = 0;
  }
  /*
  @ Event toggle auto play
  @ Set interval each 1ms
  */
  onTogglePlay() {
    if (this.autoPlay) {
      this.autoPlay = false;
      this.stopAutoPlay();
    } else {
      this.autoPlay = true;
      this.setAutoPlay();
    }
  }
  /*
  @ Set auto play interval
  */
  setAutoPlay() {
    this.storyMediaInterval = setInterval(() => {
      if (this.storyMediaTimer <= this.storyMediaMaxTimer) {
        this.storyMediaPercentTimer = this.storyMediaTimer++ / this.storyMediaMaxTimer * 100;
      } else {
        if (this.storyMediaSelectedIndex < this.stories.length - 1) {
          // Next media
          this.storyMediaSelectedIndex++;
          this.loadStory();
        } else {
          // Next story
          this.store$.dispatch(new NextStory());
        }
        this.storyMediaTimer = 0;
      }
    }, 10)
  }
  /*
  @ Stop autoplay
  */
  stopAutoPlay() {
    clearInterval(this.storyMediaInterval);
  }
  /*
  @ Event Prev Story
  */
  onPrevMedia() {
    if (this.storyMediaSelectedIndex > 0) {
      this.storyMediaSelectedIndex--;
      this.loadStory();
    } else {
      this.store$.dispatch(new PrevStory());
    }
  }
  /*
  @ Event Next Story
  */
  onNextMedia() {
    if (this.storyMediaSelectedIndex < this.stories.length - 1) {
      this.storyMediaSelectedIndex++;
      this.loadStory();
    } else {
      this.store$.dispatch(new NextStory());
    }
  }
  /*
  @ Event toggle mute
  */
  onToggleMute() {
    this.mute = !this.mute;
  }
  /*
  @ Open dialog delete story
  */
  onClickOpenDialogDeleteStory() {
    this.dialog.open(DialogDeleteStoryComponent, {
      width: '540px',
      data: this.storySelected.id
    });
  }
  /*
  @ Open dialog seen users story
  */
  onClickOpenDialogSeenUsersStory() {
    this.dialog.open(DialogSeenUsersStoryComponent, {
      width: '540px',
      maxHeight: '400px',
      data: this.storySelected.id
    });
  }
}
