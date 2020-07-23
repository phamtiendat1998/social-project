import { Component, OnInit } from '@angular/core';
import { AboutField } from '../../core/interfaces/about-field.interface';
import { AboutFieldType } from '../../core/enums/about-field-type.enum';
import { PersonalInformationService } from '../../services/personal-information.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-live-about',
  templateUrl: './profile-live-about.component.html',
  styleUrls: ['./profile-live-about.component.scss']
})
export class ProfileLiveAboutComponent implements OnInit {
  lives$: Observable<AboutField[]>;
  constructor(
    private personalInformationService: PersonalInformationService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.lives$ = this.router.parent.parent.params
      .pipe(
        mergeMap(param => this.personalInformationService.getAddressPublic(param.id))
      )
  }
}
