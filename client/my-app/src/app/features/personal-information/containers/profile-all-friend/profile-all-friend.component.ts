import { Component, OnInit } from '@angular/core';
// Rxjs
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
// Interfaces
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
// Services
import { PersonalInformationService } from '../../services/personal-information.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-all-friend',
  templateUrl: './profile-all-friend.component.html',
  styleUrls: ['./profile-all-friend.component.scss']
})
export class ProfileAllFriendComponent implements OnInit {
  friends$: Observable<UserInfo[]>;
  userId: string;
  constructor(
    private personalInformationService: PersonalInformationService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.friends$ = this.router.parent.parent.params
      .pipe(
        mergeMap(param => {
          this.userId = param.id;
          return this.personalInformationService.getFriend(param.id)
        })
      );
  }
}
