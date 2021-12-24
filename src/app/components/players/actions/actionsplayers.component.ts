import { Component , ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';



@Component({
    // moduleId: module.id,
    selector: 'content-component-actionsplayers',
    templateUrl: 'actionsplayers.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actionsplayers.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsPlayersComponent{
    id: any;
    storage_url:string;
    private sub: any;
    public TagsData:any = [];
    public PlayersData:any = [];

    dropdownSettingsteam = {
        singleSelection: true,
        idField: 'player_id',
        textField: 'fullname',
        allowSearchFilter: true
    };

    dropdownSettingstags = {
        singleSelection: true,
        idField: 'id',
        textField: 'title',
        allowSearchFilter: true
    };

    public ItemData:any = {
        player_id:0,
        player_name:'',
    };

    editorValue: string = '';

    constructor( private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute, private router:Router ){
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; 
         });

         this.storage_url = AppSettings.STORAGE_URL;

        if (this.id != 'add') {
            this.id = parseInt(this.id);
            this.getItem(); 
        }else{
            // this.getTags();
            // this.getPlayers();
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
        data.player_id = this.ItemData.player_id;           

        this._httpService.postData( 'players/item'+id , data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['players/'+ itm.id]);
        }else{
            this.generateItem()
        }
    }


    getItem(){
      
        this._httpService.getData('players/item/'+this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );
    
    }

    generateItem(){
        var itm = JSON.parse(this.ItemData._body);
        this.ItemData = itm;
        this.ItemData.team_id = [{team_id:itm.team_id, name:itm.team_name}];
        this.editorValue = itm.description;
        // this.getTags();
        // this.getPlayers();
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

    getPlayers(s){
        this._httpService.getData('livescoreplayers/search/'+s).subscribe(
            data => this.PlayersData = data,
            error => alert(error),
            () => this.generatePlayers()
        );
       
    }

    generatePlayers(){
        var players = JSON.parse(this.PlayersData._body);
        this.PlayersData = [];
        var lngth = players.length;
        if(lngth > 7){
            lngth = 7;
        }
        for(let i=0; i < lngth; i ++){
            this.PlayersData.push(players[i]);
        }

        
    }
    
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    searchPlayer(e){
        if(e.target.value.length > 2){
            this.getPlayers(e.target.value);
        }else{
            this.PlayersData = [];
        }
    }

    selectPlayer(player_id, fullname){
        this.ItemData.player_name = fullname;
        this.ItemData.player_id = player_id
        this.PlayersData = [];
    }

}