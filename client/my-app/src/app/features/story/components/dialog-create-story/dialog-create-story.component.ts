import { AddUserStory } from './../../state/story.actions';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// Mat
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Rxjs
import { Subscription } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Interface
import { Story } from '../../core/interface/story.interface';
// Serivce
import { StoryService } from './../../service/story.service';

@Component({
  selector: 'app-dialog-create-story',
  templateUrl: './dialog-create-story.component.html',
  styleUrls: ['./dialog-create-story.component.scss']
})
export class DialogCreateStoryComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  storyPreview: Story;
  subUserId$: Subscription;
  userId: string;
  uploading = false;
  textMainBtn = 'Chia sẻ';
  constructor(
    public dialogRef: MatDialogRef<DialogCreateStoryComponent>,
    private store$: Store<AppState>,
    private storyService: StoryService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
  }
  /*
  @ Event close dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Show file from file-input or drop directive
  @ Reset file input
  @ Input: file list
  */
  previewStory(fileList: FileList) {
    const story: Story = {
      url: null,
      backGround: null,
      type: null,
      id: null,
      time: null
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    if (fileList[0].type.indexOf('image') > -1) {
      reader.onload = (event) => {
        story.url = event.target.result as string;
        story.backGround = event.target.result as string;
        story.type = 'image'
        this.storyPreview = story;
      };
    } else if (fileList[0].type.indexOf('video') > -1) {
      reader.onload = (event) => {
        story.url = event.target.result as string;
        story.backGround = event.target.result as string;
        story.type = 'video'
        this.storyPreview = story;
      };
    }
    this.fileInput.nativeElement.value = '';
  }
  /*
  @ Event change value input picture
  */
  onChangeFileInput(input: any) {
    this.previewStory(input.target.files);
  }
  /*
  @ Event upload story of user
  */
  onUpload() {
    this.uploading = true;
    this.storyService.uploadStory(this.userId, this.storyPreview).subscribe(
      res => {
        this.uploading = false;
        if (res) {
          this.storyPreview.id = res;
          this.store$.dispatch(new AddUserStory({ story: this.storyPreview }));
          this.onNoClick();
          this.openSnackBar('Đăng tin thành công', null);
        } else {
          this.textMainBtn = 'Thử lại';
        }
      }
    )
  }
  /*
  @ Open snackbar
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, snackBarConfig);
  }
}
