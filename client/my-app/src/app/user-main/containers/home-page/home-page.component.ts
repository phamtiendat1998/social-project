import { Component, OnInit } from '@angular/core';
// Serivce
import { UserLoginService } from 'src/app/user-login/services/user-login.service';
import { CookieService } from 'ngx-cookie-service';
// Key
import { keyCurrentUser } from 'src/app/shared/core/key/local';
// Store
import { AppState } from 'src/app/core/state';
import { Store } from '@ngrx/store';
import { SaveInfoUserAuth } from 'src/app/core/state/user-auth/user-auth.actions';
import { LogoutUserAuth } from './../../../core/state/user-auth/user-auth.actions';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private userLoginService: UserLoginService,
    private cookieService: CookieService,
    private store$: Store<AppState>
  ) { }

  ngOnInit() {
    this.getInfo();
  }
  /*
  @ Get info user auth
  */
  getInfo() {
    if (this.cookieService.check(keyCurrentUser)) {
      const userId = JSON.parse(this.cookieService.get(keyCurrentUser));
      this.userLoginService.getInfoUser(userId).subscribe(
        res => {
          if (res) {
            this.store$.dispatch(new SaveInfoUserAuth({ userInfo: res }));
          } else {
            this.store$.dispatch(new LogoutUserAuth());
          }
        }
      )
    }
  }
}
