import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Media } from 'src/app/features/post/core/interface/media.interface';

@Component({
  selector: 'app-dialog-media-chat',
  templateUrl: './dialog-media-chat.component.html',
  styleUrls: ['./dialog-media-chat.component.scss']
})
export class DialogMediaChatComponent implements OnInit {
  medias: Media[] = [];
  mediaShown: Media;
  mediaIndex = 0;
  constructor(
    public dialogRef: MatDialogRef<DialogMediaChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.fakeData();
    this.showMedia();
  }
  fakeData() {
    this.medias = [
      {
        Type: 'image',
        Url: '../../../../../assets/images/duy.jpg',
      },
      {
        Type: 'image',
        Url: '../../../../../assets/images/nguyen.jpg',
      },
      {
        Type: 'image',
        Url: '../../../../../assets/images/duy.jpg',
      },
      {
        Type: 'image',
        Url: '../../../../../assets/images/nguyen.jpg',
      },
      {
        Type: 'image',
        Url: '../../../../../assets/images/duy.jpg',
      },
      {
        Type: 'image',
        Url: '../../../../../assets/images/duy.jpg',
      },
      {
        Type: 'image',
        Url: '../../../../../assets/images/nguyen.jpg',
      }
    ]
  }
  /*
  @ Close dialog
  */
  onClickCloseDialog() {
    this.dialogRef.close();
  }
  /*
  @ Show media based on index
  @ Input: index
  */
  showMedia() {
    this.mediaShown = this.medias[this.mediaIndex];
  }
  /*
  @ Event next media
  */
  onClickNextMedia() {
    this.mediaIndex++;
    this.mediaShown = this.medias[this.mediaIndex];
  }
  /*
   @ Event prev media
   */
  onClickPrevMedia() {
    this.mediaIndex--;
    this.mediaShown = this.medias[this.mediaIndex];
  }
}
