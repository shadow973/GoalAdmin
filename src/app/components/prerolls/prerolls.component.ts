import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-prerolls',
    templateUrl: 'prerolls.component.html',
    styleUrls: [ 'prerolls.component.css' ],
    providers: [HTTPService]
})

export class PrerollsComponent {
    constructor( private _httpService: HTTPService, private elRef: ElementRef ) {
        this.getItems();
    }

    ItemData: any = [];

    postData: any;

  deleteItem(anchor) {
    this._httpService.postData( 'prerolls/' + anchor.id, {
      _method: 'delete'
    }).subscribe(
      data => this.getItems(),
      error => alert(error),
    );
  }

  getItems() {
        this._httpService.getData('prerolls').subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateTags()
        );

    }

    generateTags() {
        let tags = JSON.parse(this.ItemData._body);
        console.log(tags);
        this.ItemData = tags;
    }

    activeActions(th) {
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}
