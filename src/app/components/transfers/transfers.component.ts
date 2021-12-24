import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    // moduleId: module.id,
    selector: 'content-component-transfers',
    templateUrl: 'transfers.component.html',
    styleUrls: [ 'transfers.component.css' ],
    providers: [HTTPService]
})

export class TransfersComponent {
  private  sub: any;
  private seasonId: any;
  public season: any;

    constructor( private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute ) {
      this.sub = route.params.subscribe(params => {
        this.seasonId = params['seasonId'];
      });

      this.getItems();
    }

    ItemData: any = [];

    postData: any;

  deleteItem(anchor) {
    this._httpService.postData( 'transfers/' + anchor.id, {
      _method: 'delete'
    }).subscribe(
      data => this.getItems(),
      error => alert(error),
    );
  }

  getItems() {
    this._httpService.getData('transfer-seasons/' + this.seasonId).subscribe(
      (data: any) => {
          this.season = JSON.parse(data._body);

        this._httpService.getData('transfers?per_page=9999&season_id=' + this.seasonId).subscribe(
          transfers => this.ItemData = transfers,
          error => alert(error),
          () => this.generateTags()
        );
      },
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
