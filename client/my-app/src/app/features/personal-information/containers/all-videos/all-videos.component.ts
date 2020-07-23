import { Component, OnInit } from '@angular/core';
import { UserMedia } from '../../core/classes/user-media.class';

@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {
  videos: UserMedia[] = [];
  constructor() { }

  ngOnInit() {
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
