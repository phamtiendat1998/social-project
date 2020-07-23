import { DialogUploadAlbumPhotoComponent } from './../../components/dialog-upload-album-photo/dialog-upload-album-photo.component';
import { DialogDeleteAlbumComponent } from './../../components/dialog-delete-album/dialog-delete-album.component';
import { MediaAlbum } from './../../core/classes/media-album.class';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-album-photo',
  templateUrl: './album-photo.component.html',
  styleUrls: ['./album-photo.component.scss']
})
export class AlbumPhotoComponent implements OnInit {
  photoAlbums: MediaAlbum[] = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fakeData();
  }
  /*
  Fake data
  */
  fakeData() {
    setTimeout(() => {
      this.photoAlbums = [
        new MediaAlbum(
          '',
          'Album #1',
          22,
          true,
          ' Đây là album số 1',
          '../../../../../assets/images/intro-landing-page-1.jpg',
        ),
        new MediaAlbum(
          '',
          'Album #2',
          2,
          true,
          ' Đây là album số 2',
          '../../../../../assets/images/intro-landing-page-1.jpg',
        ),
      ];
    }, 1000);
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
}
