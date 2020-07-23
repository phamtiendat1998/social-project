import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LinkField } from './../../core/interfaces/link-field.interface';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-link-field',
  templateUrl: './link-field.component.html',
  styleUrls: ['./link-field.component.scss']
})
export class LinkFieldComponent implements OnInit {
  @ViewChild('matExpansion') matExpansion: ElementRef;
  isExpanded = false;
  isEnableForm = false;
  @Input() link: LinkField;
  linkForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initPhoneFormGroup();
  }

  /* 
  @ Init phone form group
  */
  initPhoneFormGroup() {
    this.linkForm = new FormGroup({
      link: new FormControl(this.link.link, [Validators.required]),
    });
    this.linkForm.disable();
  }
  /* 
  @ Event click enable form 
  */
  onClickEnableForm() {
    this.isEnableForm = true;
    this.linkForm.enable();
  }
  /* 
  @ Event click save form 
  */
  onClickSaveForm() {
    this.isEnableForm = false;
    this.linkForm.disable();
    // API
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isEnableForm = false;
    this.linkForm.disable();
    this.linkForm.controls.link.setValue(this.link.link);
    this.isExpanded = false;
  }
}
