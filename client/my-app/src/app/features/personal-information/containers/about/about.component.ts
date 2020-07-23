import { LinkField } from './../../core/interfaces/link-field.interface';
import { PhoneField } from './../../core/interfaces/phone-field.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// Interface
import { NameField } from './../../core/interfaces/name-field.interface';
import { StudyField } from './../../core/interfaces/study-field.interface';
import { WorkField } from './../../core/interfaces/work-field.interface';
import { RelationshipField } from '../../core/interfaces/relationship-field.interface';
import { LiveField } from './../../core/interfaces/live-field.interface';
import { BirthdayField } from './../../core/interfaces/birthday-field.interface';
// Enum
import { RelationshipType } from '../../core/enums/relationship-type.enum';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
}
