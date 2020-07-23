import { Component, OnInit } from '@angular/core';
import { MediaAlbum } from '../../core/classes/media-album.class';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-album-photo',
  templateUrl: './profile-album-photo.component.html',
  styleUrls: ['./profile-album-photo.component.scss']
})
export class ProfileAlbumPhotoComponent implements OnInit {
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
}
