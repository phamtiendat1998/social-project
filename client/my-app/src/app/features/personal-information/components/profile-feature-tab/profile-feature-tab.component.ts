import { Component, OnInit, Input } from '@angular/core';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Rxjs
import { Observable, Subscription } from 'rxjs';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-feature-tab',
  templateUrl: './profile-feature-tab.component.html',
  styleUrls: ['./profile-feature-tab.component.scss']
})
export class ProfileFeatureTabComponent implements OnInit {
  @Input() userId: string;
  subIsFollow$: Subscription;
  isFollow: boolean;
  subIsFriend$: Subscription;
  isFriend: boolean;

  constructor(
    private store$: Store<AppState>,
    private personalInformation: PersonalInformationService,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.subIsFollow$ = this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.personalInformation.isFollow(userId, this.userId))
    ).subscribe(res => this.isFollow = res);
    this.subIsFriend$ = this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.personalInformation.isFriend(userId, this.userId))
    ).subscribe(res => this.isFriend = res);
  }
  /*
  @ Remove Friend
  */
  removeFriend() {
    this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.personalInformation.removeFriend(userId, this.userId))
    ).subscribe(res => {
      if (res) {
        this.openSnackBar('Đã hủy kết bạn', null);
        this.isFriend = false;
      } else {
        this.openSnackBar('Không thể hủy kết bạn', null);
      }
    });
  }
  /*
  @ Sent request friend
  */
  sentRequestFriend() {
    this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.personalInformation.sentRequestUser(userId, this.userId))
    ).subscribe(res => {
      if (res) {
        this.openSnackBar('Đã gửi lời mời kết bạn', null);
      } else {
        this.openSnackBar('Không thể gửi lời mời', null);
      }
    });
  }
  /*
  @ Sent Follow
  */
  sentFollow() {
    this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.personalInformation.sentFollow(userId, this.userId))
    ).subscribe(res => {
      if (res) {
        this.openSnackBar('Đã theo dõi người dùng này', null);
        this.isFollow = true;
      } else {
        this.openSnackBar('Không thể theo dõi người dùng này', null);
      }
    });
  }
  /*
  @ Sent Follow
  */
  removeFollow() {
    this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.personalInformation.removeFollow(userId, this.userId))
    ).subscribe(res => {
      if (res) {
        this.openSnackBar('Đã bỏ theo dõi người dùng này', null);
        this.isFollow = false;
      } else {
        this.openSnackBar('Không thể bỏ theo dõi người dùng này', null);
      }
    });
  }
  /*
  @ Open snackbar
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, snackBarConfig);
  }
}
