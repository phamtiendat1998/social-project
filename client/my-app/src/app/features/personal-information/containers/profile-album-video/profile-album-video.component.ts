import { Component, OnInit } from '@angular/core';
import { MediaAlbum } from '../../core/classes/media-album.class';

@Component({
  selector: 'app-profile-album-video',
  templateUrl: './profile-album-video.component.html',
  styleUrls: ['./profile-album-video.component.scss']
})
export class ProfileAlbumVideoComponent implements OnInit {
  videoAlbums: MediaAlbum[] = [];
  constructor() { }

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
}
