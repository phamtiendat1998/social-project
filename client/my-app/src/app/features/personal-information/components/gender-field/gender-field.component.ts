import { GenderField } from './../../core/interfaces/gender-field.interface';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PersonalInformationService } from '../../services/personal-information.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';

@Component({
  selector: 'app-gender-field',
  templateUrl: './gender-field.component.html',
  styleUrls: ['./gender-field.component.scss']
})
export class GenderFieldComponent implements OnInit {
  @ViewChild('matExpansion') matExpansion: ElementRef;
  @Input() gender: GenderField;
  isExpanded = false;
  isEnableForm = false;
  loading = false;
  constructor(
    private personalInformationService: PersonalInformationService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }
  /* 
  @ Event click enable form 
  */
  onClickEnableForm() {
    this.isEnableForm = true;
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isEnableForm = false;
    this.isExpanded = false;
  }
  /*
  @ Update gender connect API
  */
  onUpdateBirthday() {
    this.loading = true;
    this.personalInformationService.updateGenderUserInfo(
      this.gender.userId,
      this.gender.infoId,
      this.gender.gender,
    ).subscribe(res => {
      this.loading = false;
      if (res) {
        this.openSnackBar('Cập nhật thành công', null);
        this.isEnableForm = false;
      } else {
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
