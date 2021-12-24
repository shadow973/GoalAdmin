import { Component , ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';



@Component({
    // moduleId: module.id,
    selector: 'content-component-actionsclubs',
    templateUrl: 'actionsclubs.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actionsclubs.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsClubsComponent{
    id: any;
    storage_url:string;
    private sub: any;
    public TagsData:any = [];
    public TeamsData:any = [];

    dropdownSettingsteam = {
        singleSelection: true,
        idField: 'team_id',
        textField: 'name',
        allowSearchFilter: true
    };

    dropdownSettingstags = {
        singleSelection: true,
        idField: 'id',
        textField: 'title',
        allowSearchFilter: true
    };

    public ItemData:any = {
        bck_image:''
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
            // this.getTeams();
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

        if(!data.description) {
          alert('გთხოვთ შეავსოთ აღწერის ველი');
          return;
        }

        data.team_id = this.ItemData.team_id;
        // data.tag_id = this.ItemData.tag_id[0].id;

        this._httpService.postData( 'clubs/item'+id , data ).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['clubs/'+ itm.id]);
        }else{
            this.generateItem()
        }
    }


    getItem(){

        this._httpService.getData('clubs/item/'+this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );

    }

    generateItem(){
        var itm = JSON.parse(this.ItemData._body);
        this.ItemData = itm;
        // this.ItemData.team_id = [{team_id:itm.team_id, name:itm.team_name}];
        // this.ItemData.tag_id = [{id:itm.tag_id, title:itm.tag_name}];
        this.editorValue = itm.description;
        this.ItemData['bck_image'] = this.storage_url + itm.image;
        // this.getTags();
        // this.getTeams();
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

    // getTeams(){
    //     this._httpService.getData('teams?short=1').subscribe(
    //         data => this.TeamsData = data,
    //         error => alert(error),
    //         () => this.generateTeams()
    //     );

    // }

    getTeams(s){
        this._httpService.getData('teams/search/'+s).subscribe(
            data => this.TeamsData = data,
            error => alert(error),
            () => this.generateTeams()
        );

    }

    // generateTeams(){
    //     var teams = JSON.parse(this.TeamsData._body);
    //     this.TeamsData = teams;
    // }
    generateTeams(){
        var players = JSON.parse(this.TeamsData._body);
        this.TeamsData = [];
        var lngth = players.length;
        if(lngth > 7){
            lngth = 7;
        }
        for(let i=0; i < lngth; i ++){
            this.TeamsData.push(players[i]);
        }
    }


    searchTeam(e){
        if(e.target.value.length > 2){
            this.getTeams(e.target.value);
        }else{
            this.TeamsData = [];
        }
    }

    selectTeam(team_id, fullname){

        this.ItemData.team_name = fullname;
        this.ItemData.team_id = team_id
        this.TeamsData = [];

        console.log(this.ItemData);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
