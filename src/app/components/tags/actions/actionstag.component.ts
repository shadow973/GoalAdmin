import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';
import { Router } from '@angular/router';


@Component({
    // moduleId: module.id,
    selector: 'content-component-actionstag',
    templateUrl: 'actionstag.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actionstag.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsTagComponent{
    id: any;
    storage_url:string;
    private sub: any;
    public ItemData:any = {
        title: '',
        background_image: null,
        image: null,
        is_visible:0,
        parent_id:null
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

    ngOnInit() {
        
    }

    saveItem(e){
        e.preventDefault();
        let data:any = Lib.getFormData(e);
      
        let id:any = '';

        if(this.id != 'add'){
            id = '/'+this.id;
        }

        this._httpService.postData( 'tags'+id , data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['tags/'+ itm.id]);
        }else{
            this.generateItem()
        }
    }


    getItem(){
        this._httpService.getData('tags/'+this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );
    
    }

    generateItem(){
        var cat = JSON.parse(this.ItemData._body);
        if(cat.background_image != null){
            cat.background_image = AppSettings.STORAGE_URL + cat.background_image;
        }

        if(cat.image != null){
            cat.image =  AppSettings.STORAGE_URL + cat.image;
        }
        this.ItemData = cat;
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}