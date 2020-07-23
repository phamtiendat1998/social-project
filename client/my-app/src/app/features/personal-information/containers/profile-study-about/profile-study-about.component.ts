import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Rxjs
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';
// Interface
import { AboutField } from '../../core/interfaces/about-field.interface';

@Component({
  selector: 'app-profile-study-about',
  templateUrl: './profile-study-about.component.html',
  styleUrls: ['./profile-study-about.component.scss']
})
export class ProfileStudyAboutComponent implements OnInit {
  studies$: Observable<AboutField[]>;
  constructor(
    private personalInformationService: PersonalInformationService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.studies$ = this.router.parent.parent.params
      .pipe(
        mergeMap(param => this.personalInformationService.getStudyPublic(param.id))
      )
  }
}
