import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Rxjs
import { Observable } from 'rxjs';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';
// Interface
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
// Store
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { AppState } from 'src/app/core/state';

@Component({
  selector: 'app-profile-mutual-friends',
  templateUrl: './profile-mutual-friends.component.html',
  styleUrls: ['./profile-mutual-friends.component.scss']
})
export class ProfileMutualFriendsComponent implements OnInit {
  mutualFriends$: Observable<UserInfo[]>;
  userId: string;
  constructor(
    private personalInformationService: PersonalInformationService,
    private router: ActivatedRoute,
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.mutualFriends$ = this.router.parent.parent.params
      .pipe(
        withLatestFrom(this.store$.pipe(select(selectUserId))),
        mergeMap(([param, userOwnId]) => {
          this.userId = param.id;
          return this.personalInformationService.getMutualFriend(userOwnId, param.id)
        })
      );
  }
}
