import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
// Rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Service
import { SessionService } from '../../shared/services/session.service';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(
        private _snackBar: MatSnackBar,
        private router: Router,
    ) { }

    openSnackBar(message: string, action: string) {
        this._snackBar.open(message, action, {
            duration: 4000,
        });
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const session = JSON.parse(this.sessionService.get(this.sessionService.keyCurrentUser));
        // const cookie = this.cookieService.getCookie(this.cookieService.keyCurrentUser);
        // if (session !== null) {
        //     request = request.clone({ headers: request.headers.set('Authorization', session.token) });
        // } else if (cookie !== '') {
        //     request = request.clone({ headers: request.headers.set('Authorization', JSON.parse(cookie).token) });
        // } else {
        //     return;
        // }
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                this.openSnackBar(error.message, String(error.status));
                return throwError(error);
            })
        );
    }
}
