import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module
import { SharedModule } from './../../shared/shared.module';
// Mat
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
// Components
import { DialogCreateStoryComponent } from './components/dialog-create-story/dialog-create-story.component';
import { DialogStoryViewComponent } from './components/dialog-story-view/dialog-story-view.component';
import { StoryTabComponent } from './components/story-tab/story-tab.component';
import { StoryViewComponent } from './components/story-view/story-view.component';
// Store
import { EffectsModule } from '@ngrx/effects';
import { StoryEffects } from './state/story.effects';
import * as fromStory from './state/story.reducer';
import { StoreModule } from '@ngrx/store';
import { DialogDeleteStoryComponent } from './components/dialog-delete-story/dialog-delete-story.component';
import { DialogSeenUsersStoryComponent } from './components/dialog-seen-users-story/dialog-seen-users-story.component';

@NgModule({
  declarations: [
    StoryTabComponent,
    DialogCreateStoryComponent,
    DialogStoryViewComponent,
    StoryViewComponent,
    DialogDeleteStoryComponent,
    DialogSeenUsersStoryComponent
  ],
  imports: [
    CommonModule,
    // Module
    SharedModule,
    // Mat
    MatCheckboxModule,
    MatDialogModule,
    MatRippleModule,
    MatMenuModule,
    MatProgressBarModule,
    // Store
    StoreModule.forFeature('story', fromStory.reducer),
    EffectsModule.forFeature([StoryEffects]),
  ],
  exports: [StoryTabComponent],
})
export class StoryModule { }
