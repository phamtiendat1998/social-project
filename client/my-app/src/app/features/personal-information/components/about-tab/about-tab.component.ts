import { getAboutFieldText } from 'src/app/shared/core/helper/get-about-field-text';
import { getAboutFieldIcon } from 'src/app/shared/core/helper/get-about-field-icon';
import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
// Interfaces
import { AboutTab } from '../../core/interfaces/about-tab.interface';
import { AboutFieldType } from '../../core/enums/about-field-type.enum';
import { mergeMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { PersonalInformationService } from '../../services/personal-information.service';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';

@Component({
  selector: 'app-about-tab',
  templateUrl: './about-tab.component.html',
  styleUrls: ['./about-tab.component.scss']
})
export class AboutTabComponent implements OnInit {
  @Input() userId: string;
  abouts$: Observable<AboutTab[]>;
  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService,
  ) { }

  ngOnInit() {
    this.abouts$ = this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId =>
        this.personalInformationService.getPublicInfo(this.userId ? this.userId : userId)
          .pipe(
            map(res => {
              return res.map(item => {
                const about: AboutTab = {
                  icon: getAboutFieldIcon(item.type),
                  text: getAboutFieldText(item.type),
                  detail: item.detail
                }
                return about;
              })
            }))),
    )
  }
}
