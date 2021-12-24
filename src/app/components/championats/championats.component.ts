import { Component, ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-championats',
    templateUrl: 'championats.component.html',
    styleUrls: ['championats.component.css'],
    providers: [HTTPService]
})

export class ChampionatsComponent {
    constructor(private _httpService: HTTPService, private elRef: ElementRef) {
        this.getItems();
    }

    ItemsData: any = [];

    postData: any;

    getItems() {
        this._httpService.getData('leaguesrel').subscribe(
            data => this.ItemsData = data,
            error => alert(error),
            () => this.generateItems()
        );
    }

    generateItems() {
        var data = JSON.parse(this.ItemsData._body);
        console.log(data);
        this.ItemsData = data;
        console.log(this.ItemsData)
        
        this.ItemsData = [];
        for (let k in data) {
            this.ItemsData.push(data[k])
        }
    }

    activeActions(th) {
        th.target.parentElement.parentElement.classList.toggle('show');
    }

    delete(id: any) {
        this._httpService.postData('leaguesrel/delete/' + id, {}).subscribe(
            // error => alert(error),
            () => this.getItems()
        );
    }
}