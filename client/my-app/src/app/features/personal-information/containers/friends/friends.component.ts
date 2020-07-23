import { Component, OnInit, OnDestroy } from '@angular/core';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit, OnDestroy {
  subUserId$: Subscription;
  userId: string;
  quantityFriend$: Observable<number>;
  quantityRequest$: Observable<number>;
  quantityBlock$: Observable<number>;
  constructor(
    private store$: Store<AppState>,
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit() {
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.quantityFriend$ = this.personalInformationService.getQuanityFriend(this.userId);
    this.quantityRequest$ = this.personalInformationService.getQuantityRequest(this.userId);
    this.quantityBlock$ = this.personalInformationService.getQuantityBlockUser(this.userId);

  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
  }
}
