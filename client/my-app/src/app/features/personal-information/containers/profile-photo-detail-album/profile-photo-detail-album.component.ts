import { Component, OnInit } from '@angular/core';
import { UserMedia } from '../../core/classes/user-media.class';

@Component({
  selector: 'app-profile-photo-detail-album',
  templateUrl: './profile-photo-detail-album.component.html',
  styleUrls: ['./profile-photo-detail-album.component.scss']
})
export class ProfilePhotoDetailAlbumComponent implements OnInit {
  photos: UserMedia[] = [];
  constructor() { }

  ngOnInit(): void {
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
}
