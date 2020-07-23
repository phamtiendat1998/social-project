import { DeleteUserStory } from './../../state/story.actions';
import { Component, OnInit, Inject } from '@angular/core';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { MatSnackBar } from '@angular/material/snack-bar';
// Serivce
import { StoryService } from '../../service/story.service';
import { Subscription } from 'rxjs';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';

@Component({
  selector: 'app-dialog-delete-story',
  templateUrl: './dialog-delete-story.component.html',
  styleUrls: ['./dialog-delete-story.component.scss']
})
export class DialogDeleteStoryComponent implements OnInit {
  loading = false;
  subUserId$: Subscription;
  userId: string;
  textMainBtn = 'Xóa';
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteStoryComponent>,
    @Inject(MAT_DIALOG_DATA) public storyId: string,
    private store$: Store<AppState>,
    private storyService: StoryService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
  }
  /*
  @ Event close dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Delete story connect api
  */
  onDeleteStory() {
    this.loading = true;
    this.storyService.deleteStory(this.userId, this.storyId).subscribe(
      res => {
        this.loading = false;
        if (res) {
          this.store$.dispatch(new DeleteUserStory({ storyId: this.storyId }));
          this.onNoClick();
        } else {
          this.textMainBtn = 'Thử lại';
        }
      }
    )
  }
}
