import { Component, OnInit } from '@angular/core';
import { UserMedia } from '../../core/classes/user-media.class';

@Component({
  selector: 'app-profile-video-detail-album',
  templateUrl: './profile-video-detail-album.component.html',
  styleUrls: ['./profile-video-detail-album.component.scss']
})
export class ProfileVideoDetailAlbumComponent implements OnInit {
  videos: UserMedia[] = [];
  constructor() { }

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
          '5 : 30',
        ),
        new UserMedia(
          '../../../../../assets/images/duy.jpg',
          '',
          'Đây là nội dung post',
          99,
          100,
          1,
          new Date(),
          '4 : 30',
        ),
      ];
    }, 1000);
  }
}
