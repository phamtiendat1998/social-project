import { Component, OnInit } from '@angular/core';
import { UserMedia } from '../../core/classes/user-media.class';

@Component({
  selector: 'app-profile-all-videos',
  templateUrl: './profile-all-videos.component.html',
  styleUrls: ['./profile-all-videos.component.scss']
})
export class ProfileAllVideosComponent implements OnInit {
  videos: UserMedia[] = [];
  constructor() { }

  ngOnInit(): void {
    this.fakeData();
  }
  fakeData() {
    setTimeout(() => {
      this.videos = [
        new UserMedia(
          '../../../../../assets/images/duy.jpg',
          '',
          'Đây là nội dung post',
          56,
          19988,
          9877,
          new Date(),
          '5 : 30',
          '../../../../../assets/images/duy.jpg',
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
          '../../../../../assets/images/duy.jpg',
        ),
      ];
    }, 1000);
  }
}
