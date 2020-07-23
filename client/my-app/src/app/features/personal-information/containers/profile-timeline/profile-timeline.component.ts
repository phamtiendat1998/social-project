import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { mergeMap, map } from 'rxjs/operators';
import { AddPosts } from 'src/app/features/post/state/post.actions';
import { selectHomePosts } from 'src/app/features/post/state/post.selectors';
import { ResetPosts } from './../../../post/state/post.actions';
// Interface
import { AboutTab } from '../../core/interfaces/about-tab.interface';
import { PagingHeader } from 'src/app/shared/core/interface/header.interface';
// Serivce
import { PostService } from 'src/app/features/post/services/post.service';
// Enum
import { AboutFieldType } from '../../core/enums/about-field-type.enum';
// Other
import { UserMedia } from '../../core/classes/user-media.class';
import { SongTab } from '../../core/interfaces/song-tab.interface';
import { FriendTab } from '../../core/interfaces/friend-tab.interface';
import { FullPost } from 'src/app/features/post/core/interface/post/full-post.interface';


@Component({
  selector: 'app-profile-timeline',
  templateUrl: './profile-timeline.component.html',
  styleUrls: ['./profile-timeline.component.scss']
})
export class ProfileTimelineComponent implements OnInit {
  private userIdSub$: Subscription;
  public userId: string;
  subPost$: Subscription;
  loadingPosts = false;
  headerPost: PagingHeader = null;
  posts$: Observable<FullPost[]>;
  abouts: AboutTab[] = [];
  songs: SongTab[] = [];
  constructor(
    private router: ActivatedRoute,
    private store$: Store<AppState>,
    private postService: PostService
  ) { }
  ngOnInit(): void {
    this.userIdSub$ = this.router.parent.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.loadPostConnectApi();
    this.posts$ = this.store$.pipe(select(selectHomePosts));
    this.fakeDataSong();
  }
  ngOnDestroy() {
    this.userIdSub$.unsubscribe();
    this.store$.dispatch(new ResetPosts());
  }
  /*
  @ Load post connect api
  */
  loadPostConnectApi() {
    this.loadingPosts = true;
    this.subPost$ = this.store$.pipe(select(selectUserId))
      .pipe(
        mergeMap(userId => this.postService.getUserPosts(this.headerPost, this.userId, userId)),
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
