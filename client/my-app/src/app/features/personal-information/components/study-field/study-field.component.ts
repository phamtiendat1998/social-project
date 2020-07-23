import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Interface
import { StudyField } from './../../core/interfaces/study-field.interface';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-study-field',
  templateUrl: './study-field.component.html',
  styleUrls: ['./study-field.component.scss']
})
export class StudyFieldComponent implements OnInit {
  @ViewChild('matExpansion') matExpansion: ElementRef;
  @Input() study: StudyField;
  @Output() delete = new EventEmitter<string>();
  isExpanded = false;
  studyForm: FormGroup;
  isEnableForm = false;
  loading = false;
  constructor(
    private _snackBar: MatSnackBar,
    private personalInformationService: PersonalInformationService,
  ) { }

  ngOnInit(): void {
    this.initStudyFormGroup();
  }

  /* 
  @ Init validate study in form group
  */
  initStudyFormGroup() {
    this.studyForm = new FormGroup({
      at: new FormControl(this.study.school, [Validators.required]),
      from: new FormControl(parseInt(this.study.from), [Validators.required, Validators.min(1000), Validators.max(2020)]),
      to: new FormControl(this.study.to == null ? 2020 : parseInt(this.study.from), [Validators.min(1000), Validators.max(2020)]),
      public: new FormControl(this.study.public)
    });
    this.studyForm.disable();
  }
  /* 
  @ Event click enable form 
  */
  onClickEnableForm() {
    this.isEnableForm = true;
    this.studyForm.enable();
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isEnableForm = false;
    this.studyForm.disable();
    this.studyForm.controls.at.setValue(this.study.school);
    this.studyForm.controls.from.setValue(this.study.from);
    this.studyForm.controls.to.setValue(this.study.to);
    this.studyForm.controls.public.setValue(this.study.public);
    this.isExpanded = false;
  }
  /*
  @ Remove study connnect api
  */
  onClickRemove() {
    this.loading = true;
    this.studyForm.disable();
    this.personalInformationService.removeStudy(this.study.userId, this.study.studyId, this.study.introId).subscribe(
      res => {
        if (res) {
          this.loading = false;
          this.delete.emit(this.study.studyId);
          this.openSnackBar('Xóa thông tin thành công', null);
        } else {
          this.loading = false;
          this.openSnackBar('Xóa thông tin thất bại', null);
        }
      }
    )
  }
  /*
  @ Edit study connect api
  */
  onClickEdit() {
    this.loading = true;
    this.studyForm.disable();
    this.personalInformationService.editStudy(
      this.study.userId,
      this.study.studyId,
      this.study.introId,
      this.studyForm.value.at,
      this.studyForm.value.from,
      this.study.to = this.studyForm.value.to === null || this.studyForm.value.to === '' ? null : this.studyForm.value.to,
      this.studyForm.value.public,
    ).subscribe(
      res => {
        this.loading = false;
        if (res) {
          this.study.school = this.studyForm.value.at;
          this.study.from = this.studyForm.value.from;
          this.study.to = this.studyForm.value.to === null || this.studyForm.value.to === '' ? null : this.studyForm.value.to;
          this.study.public = this.studyForm.value.public;
          this.openSnackBar('Cập nhật thông tin thành công', null);
          this.isEnableForm = false;
        } else {
          this.studyForm.enable();
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
