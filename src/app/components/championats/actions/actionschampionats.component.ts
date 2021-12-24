import { Component , ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';



@Component({
    // moduleId: module.id,
    selector: 'content-component-actionschampionats',
    templateUrl: 'actionschampionats.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actionschampionats.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsChampionatsComponent{
    id: any;
    storage_url:string;
    private sub: any;
    public TagsData:any = [];
    public TeamsData:any = [];

    dropdownSettings = {
        singleSelection: true,
        idField: 'league_id',
        textField: 'name',
        allowSearchFilter: true
    };

    public ItemData:any = {

    };

    editorValue: string = '';
    LeaguesData: any = [];
    numbers = [];

    constructor( private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute, private router:Router ){
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
         });

         this.storage_url = AppSettings.STORAGE_URL;

         for(var i = 0; i <= 100; i++){
             this.numbers.push(i);
         }

        if (this.id != 'add') {
            this.id = parseInt(this.id);
            this.getItem();
        }else{
            this.getLeagues();
        }

    }

    ngOnInit() {

    }

    onItemSelect(item: any) {
        // console.log(item);
    }
    onSelectAll(items: any) {
        // console.log(items);
    }

    saveItem(e){
        e.preventDefault();
        let data:any = Lib.getFormData(e);
        let id:any = '';
        if(this.id != 'add'){
            id = '/'+this.id;
        }

        data.description = this.editorValue;
        data.league_id = this.ItemData.league_id[0].league_id;

        this._httpService.postData( 'leaguesrel/item'+id , data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['leaguesrel/'+ itm.id]);
        }else{
            this.generateItem()
        }
    }


    getItem(){

        this._httpService.getData('leaguesrel/item/'+this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );

    }

    generateItem(){
        var itm = JSON.parse(this.ItemData._body);
        this.ItemData = itm;
        this.ItemData.league_id = [{league_id: itm.league_id, name: itm.league.name}];
        this.editorValue = itm.description;
        this.getLeagues();
    }


    getLeagues(){
        this._httpService.getData('leagues').subscribe(
            data => this.LeaguesData = data,
            error => alert(error),
            () => this.generateLeagues()
        );

    }

    generateLeagues(){
      this.LeaguesData = JSON.parse(this.LeaguesData._body).data;
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
