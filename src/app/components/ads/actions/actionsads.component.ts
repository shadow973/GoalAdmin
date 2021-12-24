import { Component, ElementRef } from '@angular/core';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';


@Component({
    // moduleId: module.id,
    selector: 'content-component-actionsads',
    templateUrl: 'actionsads.component.html?v=${new Date().getTime()}',
    styleUrls: ['actionsads.component.css?v=${new Date().getTime()}'],
    providers: [HTTPService]
})

export class ActionsAdsComponent {
    id: any;
    storage_url: string;
    private sub: any;

    public PositionsData: any = [];
    public ItemData: any = {
        title: null,
        iframe: null,
        bck_image: '',
        max_view_count: '',
    };

    constructor(private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute, private router:Router) {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });


        this.storage_url = AppSettings.STORAGE_URL;
        if (this.id != 'add') {
            this.id = parseInt(this.id);
            this.getItem();
        }else{
            this.getPositions();
        }
    }

    ngOnInit() {

    }

    saveItem(e) {
        e.preventDefault();
        let data: any = Lib.getFormData(e);

        console.log(data);

        let id:any = '';

        if(this.id != 'add'){
            id = '/'+this.id;
        }

        this._httpService.postData('ads/item' + id, data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()

        );
        // this. generateItem()

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['ads/'+ itm.id]);
        }else{
            this.generateItem()
        }
    }

    getItem() {
        this._httpService.getData('ads/item/' + this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );

    }

    generateItem() {
        var itm = JSON.parse(this.ItemData._body);
        this.ItemData = itm;
        this.ItemData['bck_image'] = this.storage_url + itm.image;
        this.getPositions();
    }

    getPositions() {
        this._httpService.getData('ads/positions').subscribe(
            data => this.PositionsData = data,
            error => alert(error),
            () => this.generatePositions()
        );

    }

    generatePositions() {

        var items = JSON.parse(this.PositionsData._body);
        this.PositionsData = items;

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
