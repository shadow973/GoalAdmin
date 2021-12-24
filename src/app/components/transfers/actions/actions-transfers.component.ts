import {ChangeDetectorRef, Component, ElementRef} from '@angular/core';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';
import { Router } from '@angular/router';

@Component({
    // moduleId: module.id,
    selector: 'content-component-actions-transfers',
    templateUrl: 'actions-transfers.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actions-transfers.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsTransfersComponent {
    id: any;
    seasonId: any;
    storage_url:string;
    private sub: any;
    public ItemData:any = {
      player_id: '',
      from_team_id: '',
      to_team_id: '',
      transfer_price: '',
      transfer_season_id: '',
      status: '',
      league_ids: '',
      top_transfer_order: ''
    };
    public PlayersData: any = [];
    public TeamsData: any = [];
    public LeagueData: any = [];
    public SeasonsData: any = [];
    public StatusData: any = [];
    public dropdownSettingsLeague: any;
    public dropdownSettingsStatus: any;
    public dropdownSettingsSeason: any;
    public direction: any;

    constructor( private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute, private router:Router){
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.seasonId = params['seasonId'];

            if (this.id === 'add') this.ItemData.transfer_season_id = this.seasonId;
         });

        this.StatusData = ['ოფიციალური', 'ტყუილი/ჩაშლა', 'მაღალი ალბათობა', 'საშუალო ალბათობა'];

      this.dropdownSettingsLeague = {
        singleSelection: false,
        idField: 'league_id',
        textField: 'complete_name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        // itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.dropdownSettingsSeason = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        // itemsShowLimit: 3,
        allowSearchFilter: true
      };

      this.dropdownSettingsStatus = {
        singleSelection: true,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        // itemsShowLimit: 3,
        allowSearchFilter: true
      };

        this.storage_url = AppSettings.STORAGE_URL;
        if (this.id != 'add') {
            this.id = parseInt(this.id);
            this.getItem();
        }

        this.loadLeagues();
        this.loadSeasons();
    }

    saveItem(e){
        e.preventDefault();
        const data = {
          'player_id': this.ItemData.player_id,
          'from_team_id': this.ItemData.from_team_id,
          'to_team_id': this.ItemData.to_team_id,
          'transfer_price': this.ItemData.transfer_price,
          'transfer_season_id': this.ItemData.transfer_season_id,
          'league_ids': this.ItemData.leagues.map(o => o.league_id),
          'status': this.ItemData.status,
          'top_transfer_order': this.ItemData.top_transfer_order ? 1 : '',
          '_method': 'post'
        };

        let id:any = '';

        if(this.id != 'add'){
            id = '/'+this.id;
            data._method = 'patch';
        }

        this._httpService.postData( 'transfers'+id , data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );
    }

  onIsTopChange(e) {
      this.ItemData.top_transfer_order = 0;
      if(e.target.checked) this.ItemData.top_transfer_order = 1;
  }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['transfer-seasons/'+itm.transfer_season_id+'/transfers/'+ itm.id]);
        }else{
            this.generateItem()
        }
    }


    getItem(){
        this._httpService.getData('transfers/' + this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );
    }

    loadPlayers(s) {
      this._httpService.getData('livescoreplayers/search/' + s).subscribe(
        (data: any) => this.PlayersData = JSON.parse(data._body),
        error => alert(error)
      );
    }
    selectPlayer(player) {
      this.ItemData.player_id = player.player_id;
      this.ItemData.player = player;
      this.PlayersData = [];
    }
    searchPlayer(e) {
      if (e.target.value.length > 2) {
        this.loadPlayers(e.target.value);
      } else {
        this.PlayersData = [];
      }
    }

    loadTeams(s) {
      this._httpService.getData('teams?search='+s).subscribe(
        (data: any) => this.TeamsData = JSON.parse(data._body),
        error => alert(error),
      );
    }
    selectTeam(team, direction) {
      if (direction === 'from') {
        this.ItemData.from_team_id = team.team_id;
        this.ItemData.from_team = team;
      } else if (direction === 'to') {
        this.ItemData.to_team_id = team.team_id;
        this.ItemData.to_team = team;
      }

      this.TeamsData = [];
    }
    searchTeam(e, direction) {
      this.direction = direction;
      if (e.target.value.length > 2) {
        this.loadTeams(e.target.value);
      } else {
        this.TeamsData = [];
      }
    }

    loadLeagues() {
      this._httpService.getData('leagues').subscribe(
        (data: any) => {
          this.LeagueData = JSON.parse(data._body).data;
        },
        error => alert(error),
      );
    }
    loadSeasons() {
      this._httpService.getData('transfer-seasons?per_page=9999').subscribe(
        (data: any) => {
          this.SeasonsData = JSON.parse(data._body).data;
        },
            error => alert(error),
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
