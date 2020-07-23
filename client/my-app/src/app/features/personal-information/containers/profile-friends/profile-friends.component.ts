import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Rxjs
import { mergeMap, withLatestFrom, map } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';
// Store
import { selectUserId } from './../../../../core/state/user-auth/user-auth.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.scss']
})
export class ProfileFriendsComponent implements OnInit {
  quantityFriend$: Observable<number>;
  quantityMutualFriend$: Observable<number>;
  constructor(
    private personalInformationService: PersonalInformationService,
    private router: ActivatedRoute,
    private store$: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.quantityFriend$ = this.router.parent.params
      .pipe(
        mergeMap((param) => this.personalInformationService.getQuanityFriend(param.id))
      );
    this.quantityMutualFriend$ = this.router.parent.params
      .pipe(
        withLatestFrom(this.store$.pipe(select(selectUserId))),
        mergeMap(([param, userOwnId]) => this.personalInformationService.getQuantityMutualFriend(userOwnId, param.id))
      )
  }
}
