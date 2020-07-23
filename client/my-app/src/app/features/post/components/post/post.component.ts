import { selectQuantityInteractivePost } from './../../state/post.selectors';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Mat
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SheetSavePostComponent } from '../sheet-save-post/sheet-save-post.component';
import { DialogDeletePostComponent } from '../dialog-delete-post/dialog-delete-post.component';
import { DialogSharePostComponent } from './../dialog-share-post/dialog-share-post.component';
import { SheetReportPostComponent } from './../sheet-report-post/sheet-report-post.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogPostViewComponent } from './../dialog-post-view/dialog-post-view.component';
import { DialogCreatePostComponent } from '../dialog-create-post/dialog-create-post.component';
import { DialogLikedUserPostComponent } from '../dialog-liked-user-post/dialog-liked-user-post.component';
// Interface
import { FullPost } from './../../core/interface/post/full-post.interface';
import { DialogCreatePostData } from '../../core/interface/dialog-create-post-data.interface';
import { PagingHeader } from 'src/app/shared/core/interface/header.interface';
import { QuantityInteractivePost } from './../../core/interface/post/quantity-interactive-post.interface';
// Service
import { PostService } from './../../services/post.service';
// Store
import { AppState } from 'src/app/core/state';
import { DislikePost, LikePost, AddComments } from './../../state/post.actions';
import { Store, select } from '@ngrx/store';
import { selectCommentsOfPost } from '../../state/post.selectors';
import { P } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() post: FullPost;
  subComments$: Subscription;
  headerComments: PagingHeader = null;
  isOpenComment = false;
  loadingComment = false;
  commentIds$: Observable<string[]>;
  quantityInteractivePost$: Observable<QuantityInteractivePost>;
  constructor(
    public dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private postService: PostService,
    private store$: Store<AppState>
  ) { }
  ngOnInit() {
    this.quantityInteractivePost$ = this.store$.pipe(select(selectQuantityInteractivePost, { id: this.post.id }));
  }
  ngOnDestroy() {
    if (this.isOpenComment) {
      this.subComments$.unsubscribe();
    }
  }
  /*
  @ Event like post
  */
  onClickLikePost() {
    this.store$.dispatch(new LikePost({ postId: this.post.id }));
  }
  /*
  @ Event like post
  */
  onClickDislikePost() {
    this.store$.dispatch(new DislikePost({ postId: this.post.id }));
  }
  /*
  @ Event open comment
  */
  onClickOpenComment() {
    if (!this.isOpenComment) {
      this.isOpenComment = true;
      this.commentIds$ = this.store$.pipe(select(selectCommentsOfPost, { id: this.post.id }));
      if (this.post.quantityComment > 0) {
        this.getCommentConnectApi();
      }
    }
  }
  /*
  @ Event open more comment
  */
  onClickGetMoreComment() {
    this.getCommentConnectApi();
  }
  /*
  @ Get comment connect api
  */
  getCommentConnectApi() {
    this.loadingComment = true;
    this.subComments$ = this.postService.getComment(this.headerComments, this.post.id).subscribe(res => {
      this.loadingComment = false;
      this.headerComments = res.header;
      this.store$.dispatch(new AddComments({ postId: this.post.id, comments: res.data }));
    });
  }
  /*
  @ On add comment from output create comment component
  */
  onAddComment(status: boolean) {
    if (status) {
      this.headerComments.TotalCount++;
    }
  }
  /*
  @ Open dialog create post
  @ Input: media index of media list
  @ Input dialog: index, post
  */
  onClickOpenDialogPostView(mediaIndex: number) {
    this.dialog.open(DialogPostViewComponent, {
      maxWidth: '100vw',
      width: '100vw',
      height: '100vh',
      data: { mediaIndex: mediaIndex, postId: this.post.id }
    });
  }
  /*
  @ Open dialog create post for eidt
  */
  onClickOpenDialogCreatePost() {
    this.dialog.open(DialogCreatePostComponent, {
      width: '540px',
      maxHeight: '80vh',
      data: {
        postId: this.post.id,
        content: this.post.content,
        medias: this.post.medias,
        privace: this.post.privacy
      }
    });
  }
  /*
  @ Open sheet save post
  */
  onClickOpenSheetSavePost() {
    const bottomSheetRef = this.bottomSheet.open(SheetSavePostComponent);
    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }
  /*
  @ Open sheet report post
  */
  onClickOpenSheetReportPost() {
    const bottomSheetRef = this.bottomSheet.open(SheetReportPostComponent);
    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet has been dismissed.');
    });
  }
  /*
  @ Open dialog delete post
  */
  onClickOpenDialogDeletePost() {
    const dialogRef = this.dialog.open(DialogDeletePostComponent, {
      width: '540px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  /*
  @ Open dialog share post
  */
  onClickOpenDialogSharePost() {
    const dialogRef = this.dialog.open(DialogSharePostComponent, {
      width: '540px',
      maxHeight: '80vh',
      data: this.post
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  /*
  @ Open dialog like user post
  */
  onClickOpenDialogLikedUser() {
    if (this.post.quantityLike > 0) {
      this.dialog.open(DialogLikedUserPostComponent, {
        width: '540px',
        data: this.post.id
      });
    } else {
      return;
    }
  }
}
