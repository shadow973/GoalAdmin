import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../../http.service';


@Component({
    // moduleId: module.id,
    selector: 'login-component',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent{

    constructor(private router:Router, private _httpService: HTTPService){

    }

    loginUser(e){
        e.preventDefault();

        var username = e.target.elements[0].value;
        var password = e.target.elements[1].value;
        
        this._httpService.userCheckAuth(username, password);
        // this.router.navigate(['dashboard']);

        return false;
    }
}