import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  save(object: any) {
    Object.entries(object).forEach(([key, value]) => {
      sessionStorage.setItem(key, value.toString());
    });
  }

  get(key: any) {
    return sessionStorage.getItem(key);
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
  }

  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  removeAll() {
    sessionStorage.clear();
  }

}