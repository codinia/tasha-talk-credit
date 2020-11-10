import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _auth: AuthService,
    private _router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // const expectedRole = route.data.expectedRole
    if (this._auth.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }
  }

  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  {
  //   // return this._auth.isAdmin()
  // }
}
