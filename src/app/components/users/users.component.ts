import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-users',
    templateUrl: 'users.component.html',
    styleUrls: [ 'users.component.css' ],
    providers: [HTTPService]
})

export class UsersComponent{
    constructor( private _httpService: HTTPService, private elRef: ElementRef ){
        this.getUsers();
    }

    UsersData: any = [];
    exportUsers: any;
    postData: any;

    getUsers(){
        this._httpService.getData('users').subscribe(
            data => this.UsersData = data,
            error => alert(error),
            () => this.generateUsers()
        );
       
    }

    generateUsers(){
        var users = JSON.parse(this.UsersData._body);
        console.log(users);
        this.UsersData = users;
    }

    exportData(){
        this._httpService.getData('users/export').subscribe(
            data => this.exportUsers = data,
            error => alert(error),
            () => this.generateExport()
        );
    }

    generateExport(){
        console.log(this.exportUsers._body);
        return this.exportUsers._body;
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}