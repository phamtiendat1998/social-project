import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Rxjs
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
// Interface
import { AboutField } from '../../core/interfaces/about-field.interface';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-profile-basic-about',
  templateUrl: './profile-basic-about.component.html',
  styleUrls: ['./profile-basic-about.component.scss']
})
export class ProfileBasicAboutComponent implements OnInit {
  abouts$: Observable<AboutField[]>;
  constructor(
    private personalInformationService: PersonalInformationService,
    private router: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.abouts$ = this.router.parent.parent.params
      .pipe(
        mergeMap(param => this.personalInformationService.getBasicUserInfoProfile(param.id))
      )
  }
}
