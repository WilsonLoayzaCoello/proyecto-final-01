import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class LocalStorageService {

  constructor() { }

  getItem(key: string): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key);
    } else {
      return null;
    }
  }

  setItem(key: string, value: any): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    } else {
      console.error('localStorage is not available.');
    }
  }
}
