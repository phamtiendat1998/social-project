import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Rxjs
import { Subscription } from 'rxjs';
// Interface
import { StudyField } from '../../core/interfaces/study-field.interface';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
// Services
import { PersonalInformationService } from '../../services/personal-information.service';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';


@Component({
  selector: 'app-study-about',
  templateUrl: './study-about.component.html',
  styleUrls: ['./study-about.component.scss']
})
export class StudyAboutComponent implements OnInit, OnDestroy {
  studyForm: FormGroup;
  isExpanded = false;
  selectValue: string;
  subUserId$: Subscription;
  userId: string;
  subStudy$: Subscription;
  loadingAdd = false;
  textAddBtn = 'Lưu';
  studies: StudyField[];

  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService,
    private _snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
    this.initStudyFormGroup();
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.subStudy$ = this.personalInformationService.getStudy(this.userId).subscribe(res => this.studies = res);

  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
    this.subStudy$.unsubscribe();
  }
  /* 
    @ Init validate study in form group
    */
  initStudyFormGroup() {
    this.studyForm = new FormGroup({
      at: new FormControl('', [Validators.required]),
      from: new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(2020)]),
      to: new FormControl(null, [Validators.min(1000), Validators.max(2020)]),
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
  /*
  @ Event add study
  */
  onAddStudy() {
    this.studyForm.disable();
    this.loadingAdd = true;
    this.personalInformationService.addStudy(
      this.userId,
      this.studyForm.controls.at.value,
      this.studyForm.controls.from.value,
      this.studyForm.value.to === null || this.studyForm.value.to === '' ? null : this.studyForm.value.to,
      this.studyForm.value.public,
    ).subscribe(res => {
      if (res) {
        this.isExpanded = false;
        this.loadingAdd = false;
        const newItem: StudyField = {
          userId: this.userId,
          studyId: res,
          introId: null,
          school: this.studyForm.controls.at.value,
          from: this.studyForm.controls.from.value,
          to: this.studyForm.value.to === null || this.studyForm.value.to === '' ? null : this.studyForm.value.to,
          link: null,
          public: this.studyForm.value.public,
        };
        this.studyForm.reset();
        this.studies.push(newItem);
        this.openSnackBar('Thêm thông tin thành công', null);
      } else {
        this.textAddBtn = 'Thử lại';
        this.openSnackBar('Thêm thông tin thất bại', null);
      }
      this.studyForm.enable();
    })
  }
  /*
  @ Event remove study
  */
  onRemoveStudy(event) {
    for (let index = 0; index < this.studies.length; index++) {
      const element = this.studies[index];
      if (element.studyId === event) {
        this.studies.splice(index, 1);
      }
    }
  }
  /*
  @ Open snackbar
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, snackBarConfig);
  }
}
