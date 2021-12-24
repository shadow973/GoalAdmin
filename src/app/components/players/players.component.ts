import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-players',
    templateUrl: 'players.component.html',
    styleUrls: [ 'players.component.css' ],
    providers: [HTTPService]
})

export class PlayersComponent{
    constructor( private _httpService: HTTPService, private elRef: ElementRef ){
        this.getItems();
    }

    ItemsData: any = [];

    postData: any;

    getItems(){
        this._httpService.getData('players').subscribe(
            data => this.ItemsData = data,
            error => alert(error),
            () => this.generateItems()
        );       
    }

    generateItems(){
        var data = JSON.parse(this.ItemsData._body);
        console.log(data);
        this.ItemsData = data;
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }

    delete(id:any){
        this._httpService.postData( 'players/delete/'+id , {} ).subscribe(
            // error => alert(error),
            () => this.getItems()
        );
    }
}