import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Interface
import { WorkField } from './../../core/interfaces/work-field.interface';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-work-field',
  templateUrl: './work-field.component.html',
  styleUrls: ['./work-field.component.scss']
})
export class WorkFieldComponent implements OnInit {
  @ViewChild('matExpansion') matExpansion: ElementRef;
  @Input() work: WorkField;
  @Output() delete = new EventEmitter<string>();
  isExpanded = false;
  isEnableForm = false;
  workForm: FormGroup;
  loading = false;
  constructor(
    private _snackBar: MatSnackBar,
    private personalInformationService: PersonalInformationService,
  ) { }

  ngOnInit(): void {
    this.initWorkFormGroup();
  }
  /* 
  @ Init work form group
  */
  initWorkFormGroup() {
    this.workForm = new FormGroup({
      place: new FormControl(this.work.place, [Validators.required]),
      from: new FormControl(parseInt(this.work.from), [Validators.required, Validators.min(1000), Validators.max(2020)]),
      to: new FormControl(this.work.to == null ? 2020 : parseInt(this.work.from), [Validators.min(1000), Validators.max(2020)]),
      public: new FormControl(true)
    });
    this.workForm.disable();
  }
  /* 
  @ Event click enable form 
  */
  onClickEnableForm() {
    this.isEnableForm = true;
    this.workForm.enable();
  }
  /* 
  @ Event click save form 
  */
  onClickSaveForm() {
    this.isEnableForm = false;
    this.workForm.disable();
    // API
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isEnableForm = false;
    this.workForm.disable();
    this.workForm.controls.place.setValue(this.work.place);
    this.workForm.controls.from.setValue(this.work.from);
    this.workForm.controls.to.setValue(this.work.to);
    this.workForm.controls.public.setValue(this.work.public);
    this.isExpanded = false;
  }
  /*
  @ Remove work connnect api
  */
  onClickRemove() {
    this.loading = true;
    this.workForm.disable();
    this.personalInformationService.removeWork(this.work.userId, this.work.workId, this.work.introId).subscribe(
      res => {
        if (res) {
          this.loading = false;
          this.delete.emit(this.work.workId);
          this.openSnackBar('Xóa thông tin thành công', null);
        } else {
          this.loading = false;
          this.openSnackBar('Xóa thông tin thất bại', null);
        }
      }
    )
  }
  /*
  @ Edit work connect api
  */
  onClickEdit() {
    this.loading = true;
    this.workForm.disable();
    this.personalInformationService.editWork(
      this.work.userId,
      this.work.workId,
      this.work.introId,
      this.workForm.value.place,
      this.workForm.value.from,
      this.workForm.value.to === null || this.workForm.value.to === '' ? null : this.workForm.value.to,
      this.workForm.value.public,
    ).subscribe(
      res => {
        this.loading = false;
        if (res) {
          this.work.place = this.workForm.value.place;
          this.work.from = this.workForm.value.from;
          this.work.to = this.workForm.value.to;
          this.work.to = this.workForm.value.to === null || this.workForm.value.to === '' ? null : this.workForm.value.to;
          this.work.public = this.workForm.value.public;
          this.openSnackBar('Cập nhật thông tin thành công', null);
          this.isEnableForm = false;
        } else {
          this.workForm.enable();
          this.openSnackBar('Cập nhật thông tin thất bại', null);
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
