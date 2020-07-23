import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// Rxjs
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
// Interface
import { AboutField } from '../../core/interfaces/about-field.interface';
// Service
import { PersonalInformationService } from '../../services/personal-information.service';

@Component({
  selector: 'app-profile-work-about',
  templateUrl: './profile-work-about.component.html',
  styleUrls: ['./profile-work-about.component.scss']
})
export class ProfileWorkAboutComponent implements OnInit {
  works$: Observable<AboutField[]>;

  constructor(
    private personalInformationService: PersonalInformationService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.works$ = this.router.parent.parent.params
      .pipe(
        mergeMap(param => this.personalInformationService.getWorkPublic(param.id))
      )
  }

}
