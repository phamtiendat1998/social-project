import { selectUserId } from './../../../../core/state/user-auth/user-auth.selectors';
import { Component, OnInit, OnDestroy } from '@angular/core';
// Interface
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
// Services
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-all-friend',
  templateUrl: './all-friend.component.html',
  styleUrls: ['./all-friend.component.scss']
})
export class AllFriendComponent implements OnInit, OnDestroy {
  allFriends$: Observable<UserInfo[]>;
  subUserId$: Subscription;
  userId: string;
  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit(): void {
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.allFriends$ = this.personalInformationService.getFriend(this.userId);
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
  }
}
