import { ImagePersonalInformationService } from './../../services/image-personal-information.service';
import { UserMedia } from '../../core/classes/user-media.class';
import { Component, OnInit } from '@angular/core';
import { DialogDeletePhotoComponent } from '../../components/dialog-delete-photo/dialog-delete-photo.component';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserPhoto } from '../../core/interfaces/user-photo.interface';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss']
})
export class AllPhotosComponent implements OnInit {
  photos$: Observable<UserPhoto[]>;
  constructor(
    public dialog: MatDialog,
    private imagePersonalInformationService: ImagePersonalInformationService,
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
    this.photos$ = this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.imagePersonalInformationService.getAllImages(userId, true))
    )
  }
  /*
  @ Open dialog delete photo
  */
  onClickOpenDialogDeletePhoto() {
    const dialogRef = this.dialog.open(DialogDeletePhotoComponent, {
      width: '540px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
