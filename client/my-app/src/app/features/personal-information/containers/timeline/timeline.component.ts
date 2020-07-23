import { Component, OnInit } from '@angular/core';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Class
import { InteractiveNumbers } from '../../core/classes/interactive-numbers.class';
import { AboutTab } from '../../core/interfaces/about-tab.interface';
import { AboutFieldType } from '../../core/enums/about-field-type.enum';
import { FriendTab } from './../../core/interfaces/friend-tab.interface';
import { SongTab } from './../../core/interfaces/song-tab.interface';
import { UserMedia } from '../../core/classes/user-media.class';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { FullPost } from 'src/app/features/post/core/interface/post/full-post.interface';
// Interface
import { PagingHeader } from 'src/app/shared/core/interface/header.interface';
import { selectHomePosts } from 'src/app/features/post/state/post.selectors';
import { mergeMap, map } from 'rxjs/operators';
import { AddPosts, ResetPosts } from 'src/app/features/post/state/post.actions';
// Service
import { PostService } from 'src/app/features/post/services/post.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  interactiveNumber: InteractiveNumbers;
  songs: SongTab[] = [];
  subUserId$: Subscription;
  userId: string;
  posts$: Observable<FullPost[]>;
  headerPost: PagingHeader = null;
  subPost$: Subscription;
  loadingPosts = false;
  constructor(
    private store$: Store<AppState>,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.fakeDataSong();
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.loadPostConnectApi();
    this.posts$ = this.store$.pipe(select(selectHomePosts));
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
    this.subPost$.unsubscribe();
    this.store$.dispatch(new ResetPosts());
  }
  /*
  @ Load post connect api
  */
  loadPostConnectApi() {
    this.loadingPosts = true;
    this.subPost$ = this.store$.pipe(select(selectUserId))
      .pipe(
        mergeMap(userId => this.postService.getMainUserPosts(this.headerPost, userId, userId)),
        map(res => {
          this.loadingPosts = false;
          this.headerPost = res.header;
          return res.data;
        })
      )
      .subscribe(res => this.store$.dispatch(new AddPosts({ posts: res })));
  }
  /*
  @ Event scroll window
  */
  onScroll() {
    if (this.headerPost?.NextPage) {
      this.loadPostConnectApi();
    }
  }
  /*
  Fake data song
  */
  fakeDataSong() {
    setTimeout(() => {
      const song = [
        {
          Image: '../../../../../assets/images/duy.jpg',
          Name: 'Godzilla',
          Singer: 'Eminem',
          Time: '4 : 30',
        },
        {
          Image: '../../../../../assets/images/duy.jpg',
          Name: 'Godzilla',
          Singer: 'Eminem',
          Time: '4 : 30',
        },
        {
          Image: '../../../../../assets/images/duy.jpg',
          Name: 'Godzilla',
          Singer: 'Eminem',
          Time: '4 : 30',
        },
      ]
      this.songs = song;
    }, 2000);
  }
}
