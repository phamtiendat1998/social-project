import { Component, OnInit } from '@angular/core';
import { AboutField } from '../../core/interfaces/about-field.interface';
import { AboutFieldType } from '../../core/enums/about-field-type.enum';

@Component({
  selector: 'app-profile-relation-about',
  templateUrl: './profile-relation-about.component.html',
  styleUrls: ['./profile-relation-about.component.scss']
})
export class ProfileRelationAboutComponent implements OnInit {
  profileAboutFields: AboutField[] = [];
  constructor() { }

  ngOnInit(): void {
  }
}
