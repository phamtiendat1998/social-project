import { Component, OnInit } from '@angular/core';
import { MediaAlbum } from '../../core/classes/media-album.class';
import { DialogDeleteAlbumComponent } from '../../components/dialog-delete-album/dialog-delete-album.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-album-video',
  templateUrl: './album-video.component.html',
  styleUrls: ['./album-video.component.scss']
})
export class AlbumVideoComponent implements OnInit {
  videoAlbums: MediaAlbum[] = [];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fakeData();
  }
  /*
  Fake data
  */
  fakeData() {
    setTimeout(() => {
      this.videoAlbums = [
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
