import { QuantityInteractivePost } from './../../core/interface/post/quantity-interactive-post.interface';
import { mergeMap, map } from 'rxjs/operators';
import { selectUserId } from './../../../../core/state/user-auth/user-auth.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { AddPosts, ResetPosts, AddInteractivePosts } from './../../state/post.actions';
import { selectHomePosts } from '../../state/post.selectors';
// Serivce
import { PostService } from './../../services/post.service';
// Interface
import { FullPost } from '../../core/interface/post/full-post.interface';
import { PagingHeader } from 'src/app/shared/core/interface/header.interface';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrls: ['./post-container.component.scss']
})
export class PostContainerComponent implements OnInit, OnDestroy {
  subPost$: Subscription;
  posts$: Observable<FullPost[]>;
  headerPost: PagingHeader = null;
  loadingPosts = false;
  constructor(
    private store$: Store<AppState>,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.loadPostConnectApi();
    this.posts$ = this.store$.pipe(select(selectHomePosts));
  }
  ngOnDestroy() {
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
        mergeMap(userId => this.postService.getPosts(this.headerPost, userId)),
        map(res => {
          this.loadingPosts = false;
          this.headerPost = res.header;
          return res.data;
        })
      )
      .subscribe(res => {
        this.store$.dispatch(new AddPosts({ posts: res }));
      });
  }
  /*
  @ Event scroll window
  */
  onScroll() {
    if (this.headerPost?.NextPage) {
      this.loadPostConnectApi();
    }
  }
}
