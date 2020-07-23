import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable, Subscription } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';
// Interface
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';

@Component({
  selector: 'app-blocked-friend',
  templateUrl: './blocked-friend.component.html',
  styleUrls: ['./blocked-friend.component.scss']
})
export class BlockedFriendComponent implements OnInit {
  blocks$: Observable<UserInfo[]>;
  subUserId$: Subscription;
  userId: string;
  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit(): void {
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.blocks$ = this.personalInformationService.getBlockUsers(this.userId);
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
  }
}
