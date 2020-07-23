import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Rxjs
import { Subscription } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Interface
import { LiveField } from '../../core/interfaces/live-field.interface';
import { WorkField } from '../../core/interfaces/work-field.interface';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-work-about',
  templateUrl: './work-about.component.html',
  styleUrls: ['./work-about.component.scss']
})
export class WorkAboutComponent implements OnInit, OnDestroy {
  workForm: FormGroup;
  isExpanded = false;
  selectValue: string;
  subUserId$: Subscription;
  userId: string;
  subWork$: Subscription;
  works: WorkField[];
  loadingAdd = false;
  textAddBtn = 'Lưu';

  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService,
    private _snackBar: MatSnackBar,
  ) { }
  ngOnInit(): void {
    this.initWorkFormGroup();
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.subWork$ = this.personalInformationService.getWork(this.userId).subscribe(res => this.works = res);
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
    this.subWork$.unsubscribe();
  }
  /* 
  @ Init work form group
  */
  initWorkFormGroup() {
    this.workForm = new FormGroup({
      place: new FormControl('', [Validators.required]),
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
  @ Event add work
  */
  onAddWork() {
    this.workForm.disable();
    this.loadingAdd = true;
    this.personalInformationService.addWork(
      this.userId,
      this.workForm.controls.place.value,
      this.workForm.controls.from.value,
      this.workForm.value.to === null || this.workForm.value.to === '' ? null : this.workForm.value.to,
      this.workForm.value.public,
    ).subscribe(res => {
      if (res) {
        this.isExpanded = false;
        this.loadingAdd = false;
        const newItem: WorkField = {
          userId: this.userId,
          workId: res,
          introId: null,
          place: this.workForm.controls.place.value,
          from: this.workForm.controls.from.value,
          to: this.workForm.value.to === null || this.workForm.value.to === '' ? null : this.workForm.value.to,
          link: null,
          public: this.workForm.value.public,
        };
        this.workForm.reset();
        this.works.push(newItem);
        this.openSnackBar('Thêm thông tin thành công', null);
      } else {
        this.textAddBtn = 'Thử lại';
        this.openSnackBar('Thêm thông tin thất bại', null);
      }
      this.workForm.enable();
    })
  }
  /*
  @ Event remove work
  */
  onRemoveWork(event) {
    for (let index = 0; index < this.works.length; index++) {
      const element = this.works[index];
      if (element.workId === event) {
        this.works.splice(index, 1);
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
