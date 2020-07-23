import { Component, OnInit, Input } from '@angular/core';
// Rxjs
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from './../../../../core/state/user-auth/user-auth.selectors';

// Interface
import { FriendTab } from './../../core/interfaces/friend-tab.interface';
// Serivce
import { PersonalInformationService } from './../../services/personal-information.service';

@Component({
  selector: 'app-friend-tab',
  templateUrl: './friend-tab.component.html',
  styleUrls: ['./friend-tab.component.scss']
})
export class FriendTabComponent implements OnInit {
  @Input() userId: string;
  friends$: Observable<FriendTab[]>;
  constructor(
    private store$: Store<AppState>,
    private personalInformation: PersonalInformationService
  ) { }

  ngOnInit() {
    this.friends$ = this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.personalInformation.getFriendTab(this.userId ? this.userId : userId))
    )
  }

}
