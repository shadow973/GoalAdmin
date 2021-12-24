import { Component } from '@angular/core';
import { HTTPService } from '../../http.service';
// import 'rx'

@Component({
    selector: 'test-service',
    template: `
        <button (click)="onTestGet()">Test GET Request</button>
        <p>Output: {{ getData }}</p>
        <button (click)="onTestPost()">Test Post Request</button>
        <p>Output: {{ postData }}</p>
    `,
    providers: [HTTPService]
})

export class TestServiceComponent{
    getData: string;
    postData: string;

    constructor( private _httpService: HTTPService ){}

    onTestGet(){

    }

    onTestPost(){
        this._httpService.postData( `https://apigoal.rentslist.ge/api/tests`, {}).subscribe(
            data => this.postData = JSON.stringify(data),
            error => alert(error),
            () => console.log('done')
        )
    }

}
