import { Component, OnInit, Input, OnDestroy } from '@angular/core';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from './../../../../shared/core/config/snackbar-config';
// Service
import { PersonalInformationService } from './../../services/personal-information.service';
// Interface
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
// Enum
import { FriendFieldOption } from '../../core/enums/friend-field-option.enum';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { selectUserId, selectIsOwnUser } from 'src/app/core/state/user-auth/user-auth.selectors';

@Component({
  selector: 'app-friend-field',
  templateUrl: './friend-field.component.html',
  styleUrls: ['./friend-field.component.scss']
})
export class FriendFieldComponent implements OnInit {
  @Input() option: FriendFieldOption;
  @Input() user: UserInfo;
  @Input() userId: string;
  sentRequestFriend = false;
  acceptRequestFriend = false;
  denyRequestFriend = false;
  blockFriend = false;
  removeFriend = false;
  removeBlock = false;
  ownUser$: Observable<boolean>;

  constructor(
    private personalInformationService: PersonalInformationService,
    private _snackBar: MatSnackBar,
    private store$: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.ownUser$ = this.store$.pipe(select(selectIsOwnUser, { id: this.user.userId }))
  }
  /*
  @ Sent request add friend
  */
  onSentRequest() {
    this.personalInformationService.sentRequestUser(this.userId, this.user.userId).subscribe(
      res => {
        if (res) {
          this.openSnackBar('Đã gửi lời mời kết bạn', null);
          this.sentRequestFriend = true;
        } else {
          this.openSnackBar('Không thể gửi lời mời', null);
        }
      }
    );
  }
  /*
  @ Accept add friend
  */
  onAcceptRequest() {
    this.personalInformationService.acceptRequestUser(this.userId, this.user.userId).subscribe(
      res => {
        if (res) {
          this.openSnackBar('Bạn và ' + this.user.lastName + ' đã trở thành bạn bè', null);
          this.acceptRequestFriend = true;
        } else {
          this.openSnackBar('Đông ý kết bạn không thành công', null);
        }
      }
    );
  }
  /*
  @ Deny request
  */
  onDenyRequest() {
    this.personalInformationService.denyRequestUser(this.userId, this.user.userId).subscribe(
      res => {
        if (res) {
          this.openSnackBar('Đã từ chối kết bạn', null);
          this.denyRequestFriend = true;
        } else {
          this.openSnackBar('Từ chối kết bạn không thành công', null);
        }
      }
    );
  }
  /*
  @ Block user
  */
  onBlock() {
    this.personalInformationService.blockUser(this.userId, this.user.userId).subscribe(
      res => {
        if (res) {
          this.openSnackBar('Đã chặn người dùng', null);
          this.blockFriend = true;
        } else {
          this.openSnackBar('Chặn không thành công không thành công', null);
        }
      }
    );
  }
  /*
  @ Block user
  */
  onRemoveFriend() {
    this.personalInformationService.removeFriend(this.userId, this.user.userId).subscribe(
      res => {
        if (res) {
          this.openSnackBar('Bạn và ' + this.user.lastName + ' đã không còn là bạn bè', null);
          this.removeFriend = true;
        } else {
          this.openSnackBar('Chặn người dùng không thành công', null);
        }
      }
    );
  }
  /*
  @ Remove blocked user
  */
  onRemoveBlock() {
    this.personalInformationService.removeBlockUser(this.userId, this.user.userId).subscribe(
      res => {
        if (res) {
          this.openSnackBar('Bỏ chặn thành công', null);
          this.removeBlock = true;
        } else {
          this.openSnackBar('Bỏ chặn thất bại', null);
        }
      }
    );
  }
  /*
  @ Open snackbar
  */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, snackBarConfig);
  }
}
