import { Component  } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-albums',
    templateUrl: 'ads.component.html',
    styleUrls: [ 'ads.component.css' ],
    providers: [HTTPService]
})

export class AdsComponent {
    constructor( private _httpService: HTTPService) {
        this.getItems();
    }

    ItemsData: any = [];

    resetViewCount(itemId) {
      this._httpService.getData('ads/reset/' + itemId)
        .subscribe(
          data => this.getItems(),
          error => alert(error),
        );
    }

    delete(id: any) {
      this._httpService.postData( 'ads/delete/' + id, {}).subscribe(
        () => this.getItems(),
         error => alert(error)
      );
    }

    getItems() {
        this._httpService.getData('ads').subscribe(
            data => this.ItemsData = data,
            error => alert(error),
            () => this.generategetItems()
        );
    }

    generategetItems() {
        const items = JSON.parse(this.ItemsData._body);
        console.log(items);
        this.ItemsData = items;
    }

    activeActions(th) {
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}
