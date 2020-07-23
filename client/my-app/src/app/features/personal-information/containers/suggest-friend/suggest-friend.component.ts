import { Component, OnInit } from '@angular/core';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Interface
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-suggest-friend',
  templateUrl: './suggest-friend.component.html',
  styleUrls: ['./suggest-friend.component.scss']
})
export class SuggestFriendComponent implements OnInit {
  subUserId$: Subscription;
  userId: string;
  suggestFriends$: Observable<UserInfo[]>;
  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit(): void {
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.suggestFriends$ = this.personalInformationService.getSuggestUser(this.userId);
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
  }
}
