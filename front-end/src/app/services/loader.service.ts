import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  _sub: Subject<boolean>

  constructor() {

    this._sub = new Subject();
  }

  subscriberToLoader(): Observable<boolean> {
    return this._sub.asObservable();

  }

  showLoader() {
    this._sub.next(true);
  }

  hideLoader() {
    this._sub.next(false);
  }
}
