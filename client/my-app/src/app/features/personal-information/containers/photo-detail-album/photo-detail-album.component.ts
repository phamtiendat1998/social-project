import { DialogUploadPhotoComponent } from './../../components/dialog-upload-photo/dialog-upload-photo.component';
import { Component, OnInit } from '@angular/core';
import { UserMedia } from '../../core/classes/user-media.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletePhotoComponent } from '../../components/dialog-delete-photo/dialog-delete-photo.component';
import { DialogDeleteAlbumComponent } from '../../components/dialog-delete-album/dialog-delete-album.component';
import { MediaAlbum } from '../../core/classes/media-album.class';
import { DialogUploadAlbumPhotoComponent } from '../../components/dialog-upload-album-photo/dialog-upload-album-photo.component';

@Component({
  selector: 'app-photo-detail-album',
  templateUrl: './photo-detail-album.component.html',
  styleUrls: ['./photo-detail-album.component.scss']
})
export class PhotoDetailAlbumComponent implements OnInit {
  photos: UserMedia[] = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.fakeData();
  }
  /*
   Fake data
   */
  fakeData() {
    setTimeout(() => {
      this.photos = [
        new UserMedia(
          '../../../../../assets/images/duy.jpg',
          '',
          'Đây là nội dung post',
          99,
          100,
          1,
          new Date(),
        ),
        new UserMedia(
          '../../../../../assets/images/duy.jpg',
          '',
          'Đây là nội dung post',
          99,
          100,
          1,
          new Date(),
        ),
        new UserMedia(
          '../../../../../assets/images/duy.jpg',
          '',
          'Đây là nội dung post',
          99,
          100,
          1,
          new Date(),
        ),
        new UserMedia(
          '../../../../../assets/images/duy.jpg',
          '',
          'Đây là nội dung post',
          99,
          100,
          1,
          new Date(),
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
    const dialogRef = this.dialog.open(DialogUploadAlbumPhotoComponent, {
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
