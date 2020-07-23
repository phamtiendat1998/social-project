import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PhoneField } from './../../core/interfaces/phone-field.interface';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss']
})
export class PhoneFieldComponent implements OnInit {
  @ViewChild('matExpansion') matExpansion: ElementRef;
  isExpanded = false;
  isEnableForm = false;
  @Input() phone: PhoneField;
  phoneForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initPhoneFormGroup();
  }
  /* 
  @ Init phone form group
  */
  initPhoneFormGroup() {
    this.phoneForm = new FormGroup({
      number: new FormControl(this.phone.number, [Validators.required]),
      public: new FormControl(true)
    });
    this.phoneForm.disable();
  }
  /* 
  @ Event click enable form 
  */
  onClickEnableForm() {
    this.isEnableForm = true;
    this.phoneForm.enable();
  }
  /* 
  @ Event click save form 
  */
  onClickSaveForm() {
    this.isEnableForm = false;
    this.phoneForm.disable();
    // API
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isEnableForm = false;
    this.phoneForm.disable();
    this.phoneForm.controls.number.setValue(this.phone.number);
    this.isExpanded = false;
  }
}
