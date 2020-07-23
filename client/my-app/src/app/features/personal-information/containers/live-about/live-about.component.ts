import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Rxjs
import { Observable, Subscription } from 'rxjs';
// Interface
import { LiveField } from '../../core/interfaces/live-field.interface';
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Serivce
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-live-about',
  templateUrl: './live-about.component.html',
  styleUrls: ['./live-about.component.scss']
})
export class LiveAboutComponent implements OnInit, OnDestroy {
  liveForm: FormGroup;
  subUserId$: Subscription;
  userId: string;
  subLives$: Subscription;
  lives: LiveField[];
  isExpanded = false;
  loadingAdd = false;
  textAddBtn = 'Lưu';
  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initLiveFormGroup();
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.subLives$ = this.personalInformationService.getAddress(this.userId).subscribe(res => this.lives = res);
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
    this.subLives$.unsubscribe();
  }
  /* 
  @ Init live form group
  */
  initLiveFormGroup() {
    this.liveForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      from: new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(2020)]),
      to: new FormControl(null, [Validators.min(1000), Validators.max(2020)]),
      public: new FormControl(true)
    });
  }
  /* 
  @ Event click disable form 
  */
  onClickCancelForm() {
    this.isExpanded = false;
  }
  /*
  @ Event add live
  */
  onAddLive() {
    this.liveForm.disable();
    this.loadingAdd = true;
    this.personalInformationService.addAddress(
      this.userId,
      this.liveForm.value.address,
      this.liveForm.value.city,
      this.liveForm.value.province,
      this.liveForm.value.country,
      this.liveForm.value.from,
      this.liveForm.value.to === null || this.liveForm.value.to === '' ? null : this.liveForm.value.to,
      this.liveForm.value.public,
    ).subscribe(res => {
      if (res) {
        this.isExpanded = false;
        this.loadingAdd = false;
        const newItem: LiveField = {
          userId: this.userId,
          liveId: res,
          address: this.liveForm.value.address,
          city: this.liveForm.value.city,
          province: this.liveForm.value.province,
          country: this.liveForm.value.country,
          from: this.liveForm.value.from,
          to: this.liveForm.value.to === null || this.liveForm.value.to === '' ? null : this.liveForm.value.to,
          place: this.liveForm.value.city,
          public: this.liveForm.value.public,
          link: null
        };
        this.liveForm.reset();
        this.lives.push(newItem);
        this.openSnackBar('Thêm thông tin thành công', null);
      } else {
        this.textAddBtn = 'Thử lại';
        this.openSnackBar('Thêm thông tin thất bại', null);
      }
      this.liveForm.enable();
    })
  }
  /*
  @ Event remove live
  */
  onRemoveLive(event) {
    for (let index = 0; index < this.lives.length; index++) {
      const element = this.lives[index];
      if (element.liveId === event) {
        this.lives.splice(index, 1);
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
