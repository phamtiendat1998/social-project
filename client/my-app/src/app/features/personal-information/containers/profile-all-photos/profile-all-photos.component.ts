import { Component, OnInit } from '@angular/core';
import { UserMedia } from '../../core/classes/user-media.class';

@Component({
  selector: 'app-profile-all-photos',
  templateUrl: './profile-all-photos.component.html',
  styleUrls: ['./profile-all-photos.component.scss']
})
export class ProfileAllPhotosComponent implements OnInit {

  constructor() { }
  photos: UserMedia[] = [];
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
