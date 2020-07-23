import { BasicUserInfo } from './../../core/interfaces/basic-user-info.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NameField } from '../../core/interfaces/name-field.interface';
import { BirthdayField } from '../../core/interfaces/birthday-field.interface';
import { PhoneField } from '../../core/interfaces/phone-field.interface';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { PersonalInformationService } from '../../services/personal-information.service';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { LiveField } from '../../core/interfaces/live-field.interface';

@Component({
  selector: 'app-basic-about',
  templateUrl: './basic-about.component.html',
  styleUrls: ['./basic-about.component.scss']
})
export class BasicAboutComponent implements OnInit, OnDestroy {
  subUserId$: Subscription;
  userId: string;
  basicAbout$: Observable<BasicUserInfo>;
  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit(): void {
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.basicAbout$ = this.personalInformationService.getBasicUserInfo(this.userId);
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
  }
}
