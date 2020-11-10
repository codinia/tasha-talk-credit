import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router: Router, private _sessionService: SessionStorageService) { }

  public sendToken(token: string) {
    this._sessionService.save({ 'Auth_token': token })
  }

  public getToken() {
    return this._sessionService.get('Auth_token')+'';
  }

  public isLoggedIn() {
    return this.getToken() != undefined;
  }



  public logout() {
    this._sessionService.removeAll();
    localStorage.setItem('removeSessionStorange', 'foobar');
    localStorage.removeItem('removeSessionStorange');
    this._router.navigate(['/']);

  }

}