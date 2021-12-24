import { Component  } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-polls',
    templateUrl: 'polls.component.html',
    styleUrls: [ 'polls.component.css' ],
    providers: [HTTPService]
})

export class PollsComponent{
    constructor( private _httpService: HTTPService){
        this.getItems();
    }

    ItemsData: any = [];

    getItems(){
        this._httpService.getData('new_polls').subscribe(
            data => this.ItemsData = data,
            error => alert(error),
            () => this.generategetItems()
        );
       
    }

    generategetItems(){
        var items = JSON.parse(this.ItemsData._body);
        console.log(items);
        this.ItemsData = items;
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}