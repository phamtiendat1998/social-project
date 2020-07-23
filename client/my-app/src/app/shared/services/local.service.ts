import { keyActiveTheme, keyActiveColor } from '../core/key/local';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  keyActiveTheme = keyActiveTheme;
  keyActiveColor = keyActiveColor;
  constructor() { }
  check(keys: string) {
    return localStorage.getItem(keys) === null ? false : true;
  }
  save(key: string, data: any) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  get(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  removeKey(key: string) {
    window.localStorage.removeItem(key);
  }
  clear() {
    window.localStorage.clear();
  }
}
