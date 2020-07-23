import { AboutFieldType } from './../../core/enums/about-field-type.enum';
import { AboutField } from './../../core/interfaces/about-field.interface';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { PersonalInformationService } from '../../services/personal-information.service';
import { Observable } from 'rxjs';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-overview-about',
  templateUrl: './overview-about.component.html',
  styleUrls: ['./overview-about.component.scss']
})
export class OverviewAboutComponent implements OnInit {
  overViewAbouts$: Observable<AboutField[]>;
  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService,
  ) { }

  ngOnInit(): void {
    this.overViewAbouts$ = this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.personalInformationService.getPublicInfo(userId))
    )
  }
}
