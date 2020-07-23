import { Component, OnInit, Input } from '@angular/core';
// Enum
import { AboutFieldType } from '../../core/enums/about-field-type.enum';
import { AboutField } from '../../core/interfaces/about-field.interface';
// Helper
import { getAboutFieldIcon } from 'src/app/shared/core/helper/get-about-field-icon';
import { getAboutFieldText } from 'src/app/shared/core/helper/get-about-field-text';

@Component({
  selector: 'app-about-field',
  templateUrl: './about-field.component.html',
  styleUrls: ['./about-field.component.scss']
})
export class AboutFieldComponent implements OnInit {
  @Input() aboutField: AboutField;
  icon: string;
  textType: string;
  constructor() { }

  ngOnInit() {
    this.initIconAndTextType();
  }
  /*
  @ Init icon string base on type
  */
  initIconAndTextType() {
    this.icon = getAboutFieldIcon(this.aboutField.type);
    this.textType = getAboutFieldText(this.aboutField.type);
  }
}
