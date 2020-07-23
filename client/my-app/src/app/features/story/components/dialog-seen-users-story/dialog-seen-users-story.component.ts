import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Service
import { StoryService } from '../../service/story.service';
// Interface
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';

@Component({
  selector: 'app-dialog-seen-users-story',
  templateUrl: './dialog-seen-users-story.component.html',
  styleUrls: ['./dialog-seen-users-story.component.scss']
})
export class DialogSeenUsersStoryComponent implements OnInit {
  seenUsers$: Observable<UserInfo[]>
  constructor(
    public dialogRef: MatDialogRef<DialogSeenUsersStoryComponent>,
    @Inject(MAT_DIALOG_DATA) public storyId: string,
    private storyService: StoryService,
  ) { }

  ngOnInit(): void {
    this.seenUsers$ = this.storyService.getSeenUsersStory(this.storyId);
  }
  /*
  @ Event close dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
