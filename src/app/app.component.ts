import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {HTTPService} from './http.service';

@Component({
    // moduleId: module.id,
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})



export class AppComponent {
    public router:any;
    public httpService:any;

    constructor(private _router: Router, private _httpService: HTTPService ) {
        this.router = _router;
        this.httpService = _httpService;

        let token = this.httpService.getCookie('x_key');
        /*if(token.length > 0 && this.router.url === '/') {
          this.router.navigateByUrl('/dashboard');
        }*/
    }

    isLogin(){
        return false;
    }

}
