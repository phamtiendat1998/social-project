import { ImagePersonalInformationService } from './../../services/image-personal-information.service';
import { PhotoTab } from './../../core/interfaces/photo-tab.interface';
import { UserMedia } from '../../core/classes/user-media.class';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { PersonalInformationService } from '../../services/personal-information.service';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-picture-tab',
  templateUrl: './picture-tab.component.html',
  styleUrls: ['./picture-tab.component.scss']
})
export class PictureTabComponent implements OnInit {
  @Input() userId: string;
  photos$: Observable<PhotoTab[]>
  constructor(
    private store$: Store<AppState>,
    private imagePersonalInformationSerivce: ImagePersonalInformationService
  ) { }

  ngOnInit() {
    this.photos$ = this.store$.pipe(select(selectUserId)).pipe(
      mergeMap(userId => this.imagePersonalInformationSerivce.getImagesTab(this.userId ? this.userId : userId, this.userId ? false : true))
    )
  }
}
