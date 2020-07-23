import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// Store
import { AppState } from '../state';
import { Store, select } from '@ngrx/store';
import { isLoggedIn } from '../state/user-auth/user-auth.selectors';
// Rxjs
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserMainAuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private readonly store: Store<AppState>
    ) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(isLoggedIn),
            tap(
                loggedIn => {
                    if (!loggedIn) {
                        this.router.navigate(['/welcome']);
                    } else {
                        return;
                    }
                }
            )
        )
    }
}
