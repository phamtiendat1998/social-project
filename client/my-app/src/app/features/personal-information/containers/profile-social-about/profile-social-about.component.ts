import { Component, OnInit } from '@angular/core';
import { AboutField } from '../../core/interfaces/about-field.interface';
import { AboutFieldType } from '../../core/enums/about-field-type.enum';

@Component({
  selector: 'app-profile-social-about',
  templateUrl: './profile-social-about.component.html',
  styleUrls: ['./profile-social-about.component.scss']
})
export class ProfileSocialAboutComponent implements OnInit {
  profileAboutFields: AboutField[] = [];
  constructor() { }

  ngOnInit(): void {
    // this.fakeData();
  }
  /*
   @  Fake data about field
   */
  // fakeData() {
  //   setTimeout(() => {
  //     const fields = [
  //       {
  //         Type: AboutFieldType.WEB,
  //         Detail: 'fb.com/buisinguyenn',
  //         Link: 'social',
  //       },
  //     ];
  //     this.profileAboutFields = fields;
  //   }, 800);
  // }
}
