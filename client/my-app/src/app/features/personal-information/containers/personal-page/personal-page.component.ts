import { Component, OnInit, OnDestroy } from '@angular/core';
// Rxjs
import { Observable, Subscription } from 'rxjs';
// Mat
import { MatDialog } from '@angular/material/dialog';
// Serivce
import { ImagePersonalInformationService } from './../../services/image-personal-information.service';
import { PersonalInformationService } from './../../services/personal-information.service';
// Store
import { Store, select } from '@ngrx/store';
import { selectUserInfo, selectUserId } from './../../../../core/state/user-auth/user-auth.selectors';
import { AppState } from 'src/app/core/state';
// Interface
import { UserInfo } from './../../../../shared/core/interface/user-info.interface';
// Components
import { DialogUploadAvatarComponent } from '../../components/dialog-upload-avatar/dialog-upload-avatar.component';
import { DialogUploadCoverComponent } from '../../components/dialog-upload-cover/dialog-upload-cover.component';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit, OnDestroy {
  userInfo$: Observable<UserInfo>;
  subUserId$: Subscription;
  userId: string;
  cover: string;
  constructor(
    public dialog: MatDialog,
    private store$: Store<AppState>,
    private imagePersonalInformationService: ImagePersonalInformationService,
    private personalInformationService: PersonalInformationService
  ) { }

  ngOnInit() {
    this.userInfo$ = this.store$.pipe(select(selectUserInfo));
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.getCoverConnectApi();
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
  }
  /*
  @ Even open dialog upload avatar
  */
  openDialogUploadAvatar(): void {
    this.dialog.open(DialogUploadAvatarComponent, {
      width: '960px',
      maxHeight: '90vh',
      data: this.userId
    });
  }
  /*
  @ Even open dialog upload cover
  */
  openDialogUploadCover(): void {
    const dialog = this.dialog.open(DialogUploadCoverComponent, {
      width: '960px',
      maxHeight: '90vh',
      data: this.userId
    });
    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.cover = result;
      } else {
        return;
      }
    });
  }
  /*
  @ Get cover api
  */
  getCoverConnectApi() {
    this.imagePersonalInformationService.getCover(this.userId).subscribe(res => {
      if (res) {
        this.cover = res;
      } else {
        this.cover = null;
      }
    });
  }
}
