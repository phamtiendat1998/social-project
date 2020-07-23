import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LinkField } from '../../core/interfaces/link-field.interface';

@Component({
  selector: 'app-social-about',
  templateUrl: './social-about.component.html',
  styleUrls: ['./social-about.component.scss']
})
export class SocialAboutComponent implements OnInit {
  socialForm: FormGroup;
  selectValue: string;
  isExpanded = false;
  linkUser: LinkField = { link: 'https://www.facebook.com/buisinguyenn', public: true };
  constructor() { }

  ngOnInit(): void {
    this.initPhoneFormGroup();
  }
  /* 
   @ Init phone form group
   */
  initPhoneFormGroup() {
    this.socialForm = new FormGroup({
      link: new FormControl('', [Validators.required]),
      public: new FormControl(true)
    });
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.selectValue = '';
    this.isExpanded = false;
  }
}
