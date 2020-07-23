import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
// Interface
import { BirthdayField } from '../../core/interfaces/birthday-field.interface';
// Services
import { PersonalInformationService } from '../../services/personal-information.service';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';

@Component({
  selector: 'app-birth-day-field',
  templateUrl: './birth-day-field.component.html',
  styleUrls: ['./birth-day-field.component.scss']
})
export class BirthDayFieldComponent implements OnInit {
  @ViewChild('matExpansion') matExpansion: ElementRef;
  @Input() birthday: BirthdayField;
  isExpanded = false;
  birthDayForm: FormGroup;
  isEnableForm = false;
  loading = false;
  constructor(
    private personalInformationService: PersonalInformationService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initBirthDayFormGroup();
  }
  /*
  @ Init validate sign in form group
  */
  initBirthDayFormGroup() {
    this.birthDayForm = new FormGroup({
      dateOfBirth: new FormControl(
        {
          value: { dd: this.birthday.dd, mm: this.birthday.mm, yyyy: this.birthday.yyyy },
          disabled: true
        }, [Validators.required]),
    });
    this.birthDayForm.disable();
  }
  /* 
  @ Event click enable form 
  */
  onClickEnableForm() {
    this.isEnableForm = true;
    this.birthDayForm.enable();
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isEnableForm = false;
    this.birthDayForm.disable();
    this.birthDayForm.controls.dateOfBirth.setValue({ dd: this.birthday.dd, mm: this.birthday.mm, yyyy: this.birthday.yyyy });
    this.isExpanded = false;
  }
  /*
  @ Update birthday connect API
  */
  onUpdateBirthday() {
    this.loading = true;
    this.birthDayForm.disable();
    this.personalInformationService.updateBirthdayUserInfo(
      this.birthday.userId,
      this.birthday.infoId,
      new Date(this.birthDayForm.value.dateOfBirth.yyyy, this.birthDayForm.value.dateOfBirth.mm, this.birthDayForm.value.dateOfBirth.dd)
    ).subscribe(res => {
      this.loading = false;
      if (res) {
        this.openSnackBar('Cập nhật thành công', null);
        this.isEnableForm = false;
        this.birthday.dd = this.birthDayForm.value.dateOfBirth.dd;
        this.birthday.mm = this.birthDayForm.value.dateOfBirth.mm;
        this.birthday.yyyy = this.birthDayForm.value.dateOfBirth.yyyy;
      } else {
        this.birthDayForm.enable();
        this.openSnackBar('Cập nhật thất bại', null);
      }
    })
  }
  /*
  @ Open snackbar
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, snackBarConfig);
  }

}
