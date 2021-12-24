import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';


@Component({
    // moduleId: module.id,
    selector: 'content-component-actionsuser',
    templateUrl: 'actionsuser.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actionsuser.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsUserTeamComponent{
    id: number;
    storage_url:string;
    private sub: any;

    public RoleData:any = [];
    public ItemData:any = {

    };

    constructor( private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute ){
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; 
         });

         this.storage_url = AppSettings.STORAGE_URL;
         this.getItem();        
    }

    ngOnInit() {
        
    }

    saveItem(e){
        e.preventDefault();
        let data:any = Lib.getFormData(e);
      
        this._httpService.postData( 'users/'+this.id , data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.getItem()
        );

    }


    getItem(){
        this._httpService.getData('users/'+this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );
    
    }

    generateItem(){
        var itm = JSON.parse(this.ItemData._body);
        itm.avatar = this.storage_url+itm.avatar;
        this.ItemData = itm;
        console.log(itm);
         

        this.getRoles();
    }

    getRoles(){
        this._httpService.getData('roles').subscribe(
            data => this.RoleData = data,
            error => alert(error),
            () => this.generateRoles()
        );
       
    }

    generateRoles(){
        var data = JSON.parse(this.RoleData._body);
        
        this.RoleData = data;
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}