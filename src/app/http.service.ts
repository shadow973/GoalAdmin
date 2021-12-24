import { Injectable } from '@angular/core';
import {
    Http, Response, RequestOptions, RequestOptionsArgs, Headers
} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { AppSettings } from './config/config.module';


@Injectable()

export class HTTPService {
    public apiurl = AppSettings.API_URL;
    private isUserLoggedIn;
    private username;

    constructor(
        private _http: Http,
        private router: Router
    ) {
        this.isUserLoggedIn = false;
    }

    userCheckAuth(user: string, passwd: string) {
        var loginapi = 'login/jwt';

        var data = {
            email: user,
            password: passwd
        };

        var loginresult: any;

        this.postData(loginapi, data).subscribe(
            data => loginresult = data,
            error => console.log(error),
            () => this.setAuth(loginresult)
        );

    }

    setAuth(loginresult) {
        var result = JSON.parse(loginresult._body);
        // console.log(result.token);

        if(result.user.roles[0].name == 'user'){
            this.router.navigate(['/']);
            return false;
        }

        this.setCookie('x_key', result.token, 0.1);
        this.setUserLoggedIn();
        this.router.navigate(['dashboard']);
    }

    setUserLoggedIn() {
        this.isUserLoggedIn = true;

    }

    getUserLoggedIn() {
        return this.isUserLoggedIn;
    }

    getData(url) {
        var x_key = this.getCookie('x_key');

        // console.log(x_key);

        let headers = new Headers({
            'Authorization': 'Bearer ' + x_key,
            'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            'Pragma': 'no-cache',
            'Expires': '0'
        });

        let options = { headers: headers };

return this._http.get(this.apiurl + url, options);        
    }

postData(url: string, data: Object){
    // console.log(data);
    let body = new FormData();

    if (Object.keys(data).length != 0) {
        for (let key in data) {
            if (key == 'file') {
                if (data[key].length > 0) {
                    for (var i = 0; i < data[key].length; i++) {

                        console.log(data[key][i]);
                        // console.log(data[key][i].value);
                        // data[key][i].input_name
                        console.log(data[key][i]);
                        body.append(data[key][i].input_name, data[key][i], data[key][i].name);
                    }
                }

            } else {
                let value = data[key];
                // console.log(value);
                body.append(key, value);
            }

        }

    }


    var x_key = this.getCookie('x_key');

    let headers = new Headers({
        'Authorization': 'Bearer ' + x_key,
        'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre- check=0',
        'Pragma': 'no-cache',
        'Expires': '0'
    });

    let options = {
        headers: headers,
        reportProgress: true,
        observe: 'events'
    };



    console.log(this.apiurl + url);
    return this._http.post(this.apiurl + url, body, options);
}


getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
            // console.log(c.substring(cookieName.length, c.length));
            return c.substring(cookieName.length, c.length);
        }
    }

    return '';
}

deleteCookie(name) {
    this.setCookie(name, '', -1);
}

setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
}

}