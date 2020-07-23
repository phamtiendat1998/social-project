import { Injectable } from '@angular/core';
import { keyCurrentUser } from '../core/key/local';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    keyCurrentUser = keyCurrentUser;
    constructor() { }
    check(keys: string) {
        return sessionStorage.getItem(keys) === null ? false : true;
    }
    save(key: string, data: any) {
        window.sessionStorage.setItem(key, JSON.stringify(data));
    }
    get(key: string) {
        return JSON.parse(window.sessionStorage.getItem(key));
    }
    removeKey(key: string) {
        window.sessionStorage.removeItem(key);
    }
    clear() {
        window.sessionStorage.clear();
    }
}
