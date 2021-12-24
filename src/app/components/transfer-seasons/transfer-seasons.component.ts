import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-transfer-seasons',
    templateUrl: 'transfer-seasons.component.html',
    styleUrls: [ 'transfer-seasons.component.css' ],
    providers: [HTTPService]
})

export class TransferSeasonsComponent {
    constructor( private _httpService: HTTPService, private elRef: ElementRef ) {
        this.getItems();
    }

    ItemData: any = [];

    postData: any;

  deleteItem(anchor) {
    this._httpService.postData( 'transfer-seasons/' + anchor.id, {
      _method: 'delete'
    }).subscribe(
      data => this.getItems(),
      error => alert(error),
    );
  }

  getItems() {
        this._httpService.getData('transfer-seasons').subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateTags()
        );

    }

    generateTags() {
        let tags = JSON.parse(this.ItemData._body);
        this.ItemData = tags;
    }

    activeActions(th) {
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}
