import { LogoutUserAuth } from './../../../core/state/user-auth/user-auth.actions';
import { AppState } from './../../../core/state/index';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  /*
  @ Logout
  */
  onLogout() {
    this.store.dispatch(new LogoutUserAuth());
  }
}
