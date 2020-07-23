import { fullNameConcat } from 'src/app/shared/core/helper/fullname-concat';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Interface
import { NameField } from './../../core/interfaces/name-field.interface';
// Services
import { PersonalInformationService } from '../../services/personal-information.service';
// Store
import { AppState } from 'src/app/core/state';
import { Store } from '@ngrx/store';
import { SaveNameUserAuth } from 'src/app/core/state/user-auth/user-auth.actions';

@Component({
  selector: 'app-name-field',
  templateUrl: './name-field.component.html',
  styleUrls: ['./name-field.component.scss']
})
export class NameFieldComponent implements OnInit {
  @ViewChild('matExpansion') matExpansion: ElementRef;
  @Input() name: NameField;
  isExpanded = false;
  nameForm: FormGroup;
  isEnableForm = false;
  loading = false;
  constructor(
    private personalInformationService: PersonalInformationService,
    private _snackBar: MatSnackBar,
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.initNameFormGroup();
  }
  /* 
  @ Init validate sign in form group
  */
  initNameFormGroup() {
    this.nameForm = new FormGroup({
      firstName: new FormControl({ value: this.name.firstName, disabled: true }, [Validators.required]),
      lastName: new FormControl({ value: this.name.lastName, disabled: true }, [Validators.required])
    });
    this.nameForm.disable();
  }
  /* 
  @ Event click enable form 
  */
  onClickEnableForm() {
    this.isEnableForm = true;
    this.nameForm.enable();
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isEnableForm = false;
    this.nameForm.disable();
    this.nameForm.controls.firstName.setValue(this.name.firstName);
    this.nameForm.controls.lastName.setValue(this.name.lastName);
    this.isExpanded = false;
  }
  /*
  @ Update name connect API
  */
  onUpdateName() {
    this.loading = true;
    this.nameForm.disable();
    this.personalInformationService.updateNameUserInfo(
      this.name.userId,
      this.name.infoId,
      this.nameForm.controls.firstName.value,
      this.nameForm.controls.lastName.value,
    ).subscribe(res => {
      this.loading = false;
      if (res) {
        this.openSnackBar('Đổi tên thành công', null);
        this.name.firstName = this.nameForm.controls.firstName.value;
        this.name.lastName = this.nameForm.controls.lastName.value;
        this.name.fullName = fullNameConcat(this.nameForm.controls.firstName.value + '   ' + this.nameForm.controls.lastName.value);
        this.store$.dispatch(new SaveNameUserAuth({ firstName: this.nameForm.controls.firstName.value, lastName: this.nameForm.controls.lastName.value }));
        this.isEnableForm = false;
      } else {
        this.nameForm.enable();
        this.openSnackBar('Đổi tên thất bại', null);
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
