import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/features/post/core/classs/post.class';
import { SharedPostUser } from 'src/app/features/post/core/classs/shared-post-user.class';
import { UserInfo } from 'src/app/shared/core/classs/user-info.class';
import { UserMedia } from 'src/app/features/personal-information/core/classes/user-media.class';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isSearch = false;
  isDataLoaded = false;
  searchFriends: UserInfo[] = [];
  oddPosts: Post[] = [];
  evenPosts: Post[] = [];
  photos: UserMedia[] = [];
  videos: UserMedia[] = [];
  constructor() { }

  ngOnInit() {
    this.initFakeDataLoad();
    this.fakeData();
    this.fakeDataImage();
    this.fakeDataVideo();
  }
  /*
  @ Data loader
  */
  initFakeDataLoad() {
    setTimeout(() => {
      const post1 = new Post(
        '',
        '',
        'Bùi',
        'Sĩ Nguyên',
        '../../../../../assets/images/nguyen.jpg',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'public',
        [
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          },
        ],
        false,
        1200,
        2000,
        4000,
        new Date(),
        true,
      );
      const post2 = new Post(
        '',
        '',
        'Nguyễn',
        'Hữu Nghĩa Hiệp',
        '../../../../../assets/images/duy.jpg',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'private',
        [
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          },
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          }, {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          }, {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          },
        ],
        true,
        1200,
        2000,
        4000,
        new Date(),
        false
      );
      const post3 = new Post(
        '',
        '',
        'Hạ',
        'Duy',
        '../../../../../assets/images/duy.jpg',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'private',
        [
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-2.jpeg',
          },
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          }
        ],
        true,
        500,
        2000,
        4200,
        new Date(),
        false
      );
      const post4 = new Post(
        '',
        '',
        'Phạm Tiến',
        'Đạt',
        '../../../../../assets/images/nguyen.jpg',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'public',
        [
          {
            Type: 'video',
            Url: '../../../../../assets/videos/1.mp4',
          },
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          },
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-3.jpg',
          },
        ],
        true,
        1200,
        2000,
        20,
        new Date(),
        true
      );
      const post5 = new Post(
        '',
        '',
        'Hoàng',
        'Huy',
        '../../../../../assets/images/nguyen.jpg',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        'public',
        [
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          },
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-3.jpg',
          }, {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          },
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-3.jpg',
          },
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-1.jpg',
          },
          {
            Type: 'image',
            Url: '../../../../../assets/images/intro-landing-page-3.jpg',
          },
        ],
        true,
        1200,
        2000,
        20,
        new Date(),
        true
      );
      this.oddPosts.push(post1);
      this.evenPosts.push(post2);
      this.oddPosts.push(post3);
      this.evenPosts.push(post4);
      this.oddPosts.push(post5);
      this.isDataLoaded = true;
    }, 2000);
  }
  /*
  @ Event press enter search
  */
  onPressEnter() {
    this.isSearch = true;
  }
  /*
  @  Fake data
  */
  fakeData() {
    setTimeout(() => {
      this.searchFriends = [
        new UserInfo('', 'Hạ', 'Duy 3', '../../../../../assets/images/duy.jpg'),
        new UserInfo('', 'Hạ', 'Duy 4', '../../../../../assets/images/duy.jpg'),
        new UserInfo('', 'Hạ', 'Duy 5', '../../../../../assets/images/duy.jpg'),
        new UserInfo('', 'Hạ', 'Duy 3', '../../../../../assets/images/duy.jpg'),
        new UserInfo('', 'Hạ', 'Duy 4', '../../../../../assets/images/duy.jpg'),
        new UserInfo('', 'Hạ', 'Duy 5', '../../../../../assets/images/duy.jpg'),
        new UserInfo('', 'Hạ', 'Duy 3', '../../../../../assets/images/duy.jpg'),
        new UserInfo('', 'Hạ', 'Duy 4', '../../../../../assets/images/duy.jpg'),
        new UserInfo('', 'Hạ', 'Duy 5', '../../../../../assets/images/duy.jpg'),
      ];
    }, 1000);
  }
  /*
   Fake data
   */
  fakeDataImage() {
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
  fakeDataVideo() {
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
