import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-auto-linker',
    templateUrl: 'auto-linker.component.html',
    styleUrls: [ 'auto-linker.component.css' ],
    providers: [HTTPService]
})

export class AutoLinkerComponent {
    constructor( private _httpService: HTTPService, private elRef: ElementRef ) {
        this.getItems();
    }

    ItemData: any = [];

    postData: any;

  deleteItem(anchor) {
    this._httpService.postData( 'article-anchors/' + anchor.id, {
      _method: 'delete'
    }).subscribe(
      data => this.getItems(),
      error => alert(error),
    );
  }

  getItems() {
        this._httpService.getData('article-anchors').subscribe(
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
