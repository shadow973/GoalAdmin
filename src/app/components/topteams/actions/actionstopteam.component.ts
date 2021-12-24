import { Component , ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';


@Component({
    // moduleId: module.id,
    selector: 'content-component-actionstopteam',
    templateUrl: 'actionstopteam.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actionstopteam.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsTopTeamComponent{
    id: any;
    storage_url:string;
    private sub: any;

    public TagsData:any = [];
    public ItemData:any = {

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
            this.getTags()
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

        this._httpService.postData( 'top-teams'+id , data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['top-teams/'+ itm.id]);
        }else{
            this.generateItem()
        }
    }


    getItem(){
        this._httpService.getData('top-teams/'+this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );
    
    }

    generateItem(){
        var itm = JSON.parse(this.ItemData._body);
        this.ItemData = itm;

        this.getTags();
    }

    getTags(){
        this._httpService.getData('tags').subscribe(
            data => this.TagsData = data,
            error => alert(error),
            () => this.generateTags()
        );
       
    }

    generateTags(){
        var tags = JSON.parse(this.TagsData._body);
        
        this.TagsData = tags;
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}