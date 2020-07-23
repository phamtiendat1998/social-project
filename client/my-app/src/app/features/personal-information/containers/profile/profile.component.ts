import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Service
import { PersonalInformationService } from './../../services/personal-information.service';
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private userIdSub$: Subscription;
  private userId: string;
  userInfo$: Observable<UserInfo>;
  cover$: Observable<string>;
  constructor(
    private personalInformationService: PersonalInformationService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userIdSub$ = this.router.params.subscribe(params => {
      this.userId = params['id'];
      this.userInfo$ = this.personalInformationService.getInfo(this.userId);
      this.cover$ = this.personalInformationService.getCoverProfile(this.userId);
    });
  }
  ngOnDestroy() {
    this.userIdSub$.unsubscribe();
  }
}
