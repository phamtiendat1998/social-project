import { DialogUploadAlbumVideoComponent } from './../../components/dialog-upload-album-video/dialog-upload-album-video.component';
import { DialogDeletePhotoComponent } from './../../components/dialog-delete-photo/dialog-delete-photo.component';
import { Component, OnInit } from '@angular/core';
import { MediaAlbum } from '../../core/classes/media-album.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteAlbumComponent } from '../../components/dialog-delete-album/dialog-delete-album.component';
import { DialogUploadPhotoComponent } from '../../components/dialog-upload-photo/dialog-upload-photo.component';
import { UserMedia } from '../../core/classes/user-media.class';

@Component({
  selector: 'app-video-detail-album',
  templateUrl: './video-detail-album.component.html',
  styleUrls: ['./video-detail-album.component.scss']
})
export class VideoDetailAlbumComponent implements OnInit {
  videos: UserMedia[] = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fakeData();
  }
  /*
   Fake data
   */
  fakeData() {
    setTimeout(() => {
      this.videos = [
        new UserMedia(
          '../../../../../assets/images/duy.jpg',
          '',
          'Đây là nội dung post',
          99,
          100,
          1,
          new Date(),
          '5: 30',
        ),
        new UserMedia(
          '../../../../../assets/images/duy.jpg',
          '',
          'Đây là nội dung post',
          99,
          100,
          1,
          new Date(),
          '5: 30',
        ),
      ];
    }, 1000);
  }
  /*
  @ Open dialog delete photo
  */
  onClickOpenDialogDeletePhoto() {
    const dialogRef = this.dialog.open(DialogDeletePhotoComponent, {
      width: '540px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  /*
  @ Open dialog delete album
  */
  onClickOpenDialogDeleteAlbum() {
    const dialogRef = this.dialog.open(DialogDeleteAlbumComponent, {
      width: '540px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  /*
  @ Open dialog edit album
  */
  onClickOpenDialogEditAlbum(album: MediaAlbum) {
    const dialogRef = this.dialog.open(DialogUploadAlbumVideoComponent, {
      width: '540px',
      data: album,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  /*
  @ Open dialog upload photo  
  */
  onClickOpenDialogUploadPhoto() {
    const dialogRef = this.dialog.open(DialogUploadPhotoComponent, {
      width: '540px',
      data: {},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
