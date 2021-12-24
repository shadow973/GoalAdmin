import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { HTTPService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _httpService: HTTPService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this._httpService.getUserLoggedIn()) {

      var checktokerres: any;

      var token = this._httpService.getCookie('x_key');
      if (token != '') {
        var checktokenurl = 'users/me?token=' + token;
        this._httpService.getData(checktokenurl).subscribe(
          data => checktokerres = data,
          error => this.redirectToLogin(),
          () => this.checktokenresult(checktokerres)
        );


      } else {
        this.redirectToLogin();
      }

    }

    return true;
  }

  checktokenresult(checktokerres: any) {
    var res = JSON.parse(checktokerres._body);


    if (typeof res.id !== 'undefined') {

      if (res.roles[0].name == 'user') {
        this._httpService.deleteCookie('x_key');
        this.router.navigate(['/']);
        return false;
      }

      if (res.id > 0) {
        this._httpService.setUserLoggedIn();
      }
    } else {
      this.redirectToLogin();
    }

  }

  redirectToLogin() {
    this._httpService.deleteCookie('x_key');
    this.router.navigate(['/']);
  }


}
