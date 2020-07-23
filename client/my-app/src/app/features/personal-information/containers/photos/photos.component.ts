import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadPhotoComponent } from '../../components/dialog-upload-photo/dialog-upload-photo.component';
import { DialogUploadAlbumPhotoComponent } from '../../components/dialog-upload-album-photo/dialog-upload-album-photo.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
  }
  onClickOpenDialogUpPhoto(): void {
    const dialogRef = this.dialog.open(DialogUploadPhotoComponent, {
      width: '540px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onClickOpenDialogUpAlbum(): void {
    const dialogRef = this.dialog.open(DialogUploadAlbumPhotoComponent, {
      maxHeight: '80vh',
      width: '540px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
