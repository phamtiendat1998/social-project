import { DialogUploadVideoComponent } from './../../components/dialog-upload-video/dialog-upload-video.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadAlbumVideoComponent } from '../../components/dialog-upload-album-video/dialog-upload-album-video.component';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit() {
  }
  onClickOpenDialogUpVideo(): void {
    const dialogRef = this.dialog.open(DialogUploadVideoComponent, {
      width: '540px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  onClickOpenDialogUpAlbum(): void {
    const dialogRef = this.dialog.open(DialogUploadAlbumVideoComponent, {
      maxHeight: '80vh',
      width: '540px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
