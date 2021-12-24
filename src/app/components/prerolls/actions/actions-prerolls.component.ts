import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';
import { Router } from '@angular/router';


@Component({
    // moduleId: module.id,
    selector: 'content-component-actions-prerolls',
    templateUrl: 'actions-prerolls.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actions-prerolls.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsPrerollsComponent {
    id: any;
    storage_url:string;
    private sub: any;
    public ItemData:any = {
        name: '',
        video_url: '',
        click_tracking_url: '',
        impression_tracking_url: '',
        percentage: '50',
        is_active: '',
    };

    constructor( private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute, private router:Router ){
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
         });

        this.storage_url = AppSettings.STORAGE_URL;
        if (this.id != 'add') {
            this.id = parseInt(this.id);
            this.getItem();
        }else{

        }

    }

    saveItem(e){
        e.preventDefault();
        let data:any = Lib.getFormData(e);

        let id:any = '';

        if(this.id != 'add'){
            id = '/'+this.id;
        }

        this._httpService.postData( 'prerolls'+id , data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['prerolls/'+ itm.id]);
        }else{
            this.generateItem()
        }
    }


    getItem(){
        this._httpService.getData('prerolls/'+this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );

    }

    generateItem(){
        var cat = JSON.parse(this.ItemData._body);
        this.ItemData = cat;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
