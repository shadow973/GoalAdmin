import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-topteams',
    templateUrl: 'topteams.component.html',
    styleUrls: [ 'topteams.component.css' ],
    providers: [HTTPService]
})

export class TopTearmsComponent{
    constructor( private _httpService: HTTPService, private elRef: ElementRef ){
        this.getTearms();
    }

    TeamsData: any = [];

    postData: any;

    getTearms(){
        this._httpService.getData('top-teams').subscribe(
            data => this.TeamsData = data,
            error => alert(error),
            () => this.generateTearms()
        );       
    }

    generateTearms(){
        var tearms = JSON.parse(this.TeamsData._body);
        console.log(tearms);
        this.TeamsData = tearms;
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }

    delete(id:any){

        let data = { _method: 'DELETE' };

        this._httpService.postData( 'top-teams/'+id , data).subscribe(
            // error => alert(error),
            () => this.getTearms()
        );
    }
}