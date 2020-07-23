import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Router
import { PostRoutingModule } from './post-routing.module';
// Module
import { StoryModule } from './../story/story.module';
import { SharedModule } from 'src/app/shared/shared.module';
// Components
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostComponent } from './components/post/post.component';
import { PostContainerComponent } from './containers/post-container/post-container.component';
import { DialogCreatePostComponent } from './components/dialog-create-post/dialog-create-post.component';
import { PostCommentComponent } from './components/post-comment/post-comment.component';
import { DialogPostViewComponent } from './components/dialog-post-view/dialog-post-view.component';
import { SkeletonPostComponent } from './components/skeleton-post/skeleton-post.component';
import { SkeletonPostCommentComponent } from './components/skeleton-post-comment/skeleton-post-comment.component';
import { DialogSharePostComponent } from './components/dialog-share-post/dialog-share-post.component';
import { DialogDeletePostComponent } from './components/dialog-delete-post/dialog-delete-post.component';
import { SheetSavePostComponent } from './components/sheet-save-post/sheet-save-post.component';
import { SheetReportPostComponent } from './components/sheet-report-post/sheet-report-post.component';
import { CreateCommentPostComponent } from './components/create-comment-post/create-comment-post.component';
import { DialogDeleteCommentComponent } from './components/dialog-delete-comment/dialog-delete-comment.component';
import { UpdateCommentPostComponent } from './components/update-comment-post/update-comment-post.component';
// Mat
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
// Store
import { EffectsModule } from '@ngrx/effects';
import { PostEffects } from './state/post.effects';
import { StoreModule } from '@ngrx/store';
import * as fromPost from "./state/post.reducer";
import { ReplyCommentPostComponent } from './components/reply-comment-post/reply-comment-post.component';
import { UpdateReplyCommentPostComponent } from './components/update-reply-comment-post/update-reply-comment-post.component';
import { DialogDeleteReplyCommentPostComponent } from './components/dialog-delete-reply-comment-post/dialog-delete-reply-comment-post.component';
import { DialogLikedUserPostComponent } from './components/dialog-liked-user-post/dialog-liked-user-post.component';


@NgModule({
  declarations: [
    CreatePostComponent,
    PostComponent,
    PostContainerComponent,
    DialogCreatePostComponent,
    PostCommentComponent,
    DialogPostViewComponent,
    SkeletonPostComponent,
    SkeletonPostCommentComponent,
    DialogSharePostComponent,
    DialogDeletePostComponent,
    SheetSavePostComponent,
    SheetReportPostComponent,
    CreateCommentPostComponent,
    DialogDeleteCommentComponent,
    UpdateCommentPostComponent,
    ReplyCommentPostComponent,
    UpdateReplyCommentPostComponent,
    DialogDeleteReplyCommentPostComponent,
    DialogLikedUserPostComponent,
  ],
  imports: [
    CommonModule,
    // Router
    PostRoutingModule,
    // Module
    StoryModule,
    SharedModule,
    // Mat
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatBottomSheetModule,
    MatListModule,
    MatDialogModule,
    // Store
    StoreModule.forFeature('post', fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  exports: [
    CreatePostComponent,
    PostComponent,
    SkeletonPostComponent,
  ]
})
export class PostModule { }
