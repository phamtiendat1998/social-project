import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';
// Interface
import { LiveField } from './../../core/interfaces/live-field.interface';

@Component({
  selector: 'app-live-field',
  templateUrl: './live-field.component.html',
  styleUrls: ['./live-field.component.scss']
})
export class LiveFieldComponent implements OnInit {
  @ViewChild('matExpansion') matExpansion: ElementRef;
  @Input() live: LiveField;
  @Output() delete = new EventEmitter<string>();
  isExpanded = false;
  isEnableForm = false;
  liveForm: FormGroup;
  loading = false;
  constructor(
    private personalInformationService: PersonalInformationService,
    private _snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.initLiveFormGroup();
  }
  /* 
  @ Init live form group
  */
  initLiveFormGroup() {
    this.liveForm = new FormGroup({
      address: new FormControl(this.live.address, [Validators.required]),
      city: new FormControl(this.live.city, [Validators.required]),
      province: new FormControl(this.live.province, [Validators.required]),
      country: new FormControl(this.live.country, [Validators.required]),
      from: new FormControl(parseInt(this.live.from), [Validators.required, Validators.min(1000), Validators.max(2020)]),
      to: new FormControl(this.live.to == null ? 2020 : parseInt(this.live.to), [Validators.min(1000), Validators.max(2020)]),
      public: new FormControl(this.live.public)
    });
    this.liveForm.disable();
  }
  /* 
  @ Event click enable form 
  */
  onClickEnableForm() {
    this.isEnableForm = true;
    this.liveForm.enable();
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isEnableForm = false;
    this.liveForm.disable();
    this.liveForm.controls.address.setValue(this.live.address);
    this.liveForm.controls.city.setValue(this.live.city);
    this.liveForm.controls.province.setValue(this.live.province);
    this.liveForm.controls.country.setValue(this.live.country);
    this.liveForm.controls.from.setValue(this.live.from);
    this.liveForm.controls.to.setValue(this.live.to == null ? 2020 : parseInt(this.live.from));
    this.liveForm.controls.public.setValue(this.live.public);
    this.isExpanded = false;
    this.loading = false;
  }
  /*
  @ Remove address connnect api
  */
  onClickRemove() {
    this.loading = true;
    this.liveForm.disable();
    this.personalInformationService.removeAddress(this.live.userId, this.live.liveId).subscribe(
      res => {
        if (res) {
          this.loading = false;
          this.delete.emit(this.live.liveId);
          this.openSnackBar('Xóa bỏ thông tin thành công', null);
        } else {
          this.loading = false;
          this.openSnackBar('Xóa bỏ thông tin thất bại', null);
        }
      }
    )
  }
  /*
  @ Edit address connect api
  */
  onClickEdit() {
    this.loading = true;
    this.liveForm.disable();
    this.personalInformationService.editAddress(
      this.live.userId,
      this.live.liveId,
      this.liveForm.value.address,
      this.liveForm.value.city,
      this.liveForm.value.province,
      this.liveForm.value.country,
      this.liveForm.value.from,
      this.liveForm.value.to === null || this.liveForm.value.to === '' ? null : this.liveForm.value.to,
      this.liveForm.value.public,
    ).subscribe(
      res => {
        this.loading = false;
        if (res) {
          this.live.address = this.liveForm.value.address;
          this.live.city = this.liveForm.value.city;
          this.live.province = this.liveForm.value.province;
          this.live.country = this.liveForm.value.country;
          this.live.from = this.liveForm.value.from;
          this.live.to = this.liveForm.value.to === null || this.liveForm.value.to === '' ? null : this.liveForm.value.to;
          this.live.public = this.liveForm.value.public;
          this.openSnackBar('Cập nhật thành công', null);
          this.isEnableForm = false;
        } else {
          this.openSnackBar('Cập nhật thất bại', null);
          this.liveForm.enable();
        }
      }
    )
  }
  /*
  @ Open snackbar
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, snackBarConfig);
  }
}
