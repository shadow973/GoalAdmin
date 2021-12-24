import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';
import { Router } from '@angular/router';

import { CKEditorModule } from 'ngx-ckeditor';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ModalAutolinkComponent} from './modal-autolink.component';
import {ModalStandingsComponent} from './modal-standings.component';
import {ModalGoalscorersComponent} from './modal-goalscorers.component';
import {ModalResultsComponent} from './modal-results.component';


@Component({
    // moduleId: module.id,
    selector: 'content-component-actionshomecategory',
    templateUrl: 'actionsarticle.component.html?v=${new Date().getTime()}',
    styleUrls: ['actionsarticle.component.css?v=${new Date().getTime()}'],
    providers: [HTTPService, Lib]
})

export class ActionsArticleComponent implements OnInit {
  bsModalRef: BsModalRef;

    id: any;

    storage_url: string;
    private sub: any;
    public ItemData: any = {
        title: '',
        main_gallery_item: { filename_preview: '' },
        categories: [],
        tags: [],
        main_gallery_item_id: '',
        players: [],
        teams: [],
        hashtags: [],
    };
    CategoriesData: any = [];
    hashtagData: any = [];
    TagsData: any = [];

    editorValue = '';
    mainimg = '';
    watermark = 'hidden';

    uploadedFile: any;

    selectedCategories: any = [];
    dropdownSettingsCats: any = {};
    dropdownSettingsArticle: any = {};
    dropdownSettingsLeagues: any = {};
    dropdownSettingsTeams: any = {};
    dropdownSettingsTest: any = {};
    PlayersData: any = [];
  StatusData: any = [];
    LeaguesData: any = [];
    TeamsData: any = [];
    ArticlesData: any = [{
      'id': 0,
      'title': 'აირჩიეთ სტატია'
    }];
    articleKeyword: '';
    insertArticleItem: { };
    insertArticleItemWithPic: true;
    exampleData = [
        {
          id: 'basic1',
          text: 'Basic 1'
        },
        {
          id: 'basic2',
          disabled: true,
          text: 'Basic 2'
        },
        {
          id: 'basic3',
          text: 'Basic 3'
        },
        {
          id: 'basic4',
          text: 'Basic 4'
        }
      ];



    constructor(private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute, private router: Router, private modalService: BsModalService) {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });

      this.StatusData = ['ოფიციალური', 'ტყუილი/ჩაშლა', 'მაღალი ალბათობა', 'საშუალო ალბათობა'];

        this.ItemData = {
          title: '',
          main_gallery_item: { filename_preview: '' },
          categories: [],
          tags: [],
          main_gallery_item_id: '',
          players: [],
          teams: [],
          hashtags: [],
        };

        this.storage_url = AppSettings.STORAGE_URL;

        if (this.id != 'add') {
            this.id = parseInt(this.id);
            this.getItem();
        } else {
            this. getTags();
            this.getCategories();
            this.getHashtags();
            this.getLeagues();
            // this.getTeams();
        }

    }

    saveLoader = false;

    ngOnInit() {
      this.dropdownSettingsCats = {
        singleSelection: false,
        idField: 'id',
        textField: 'title',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        // itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.dropdownSettingsArticle = {
        singleSelection: true,
        idField: 'id',
        textField: 'title',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        // itemsShowLimit: 3,
        allowSearchFilter: true,
        allowRemoteDataSearch: true,
        closeDropDownOnSelection: true
      };
        this.dropdownSettingsLeagues = {
            singleSelection: false,
            idField: 'league_id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            // itemsShowLimit: 3,
            allowSearchFilter: true
        };

        this.dropdownSettingsTeams = {
            singleSelection: false,
            idField: 'team_id',
            textField: 'name',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            // itemsShowLimit: 3,
            allowSearchFilter: true
        };

        this.dropdownSettingsTest = {
            singleSelection: true,
            idField: 'id',
            textField: 'title',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            // itemsShowLimit: 3,
            allowSearchFilter: true
        };

        /*setInterval(() => {
          const title = document.getElementById('title');
          // @ts-ignore
          if ((!this.ItemData.id || this.ItemData.is_draft === 1) && title && title.value && title.value !== '') {
            const event = {
              target: document.getElementById('articleForm')
            };

            this.saveDraft(this.getFormData(event));
          }
        }, 60 * 5 * 1000);*/

    }

  onStandingsModalClosed(league) {
    this.editorValue += '[type="standings" league-id="' + league.league_id + '"]';
  }
  onGoalscorerModalClosed(league) {
    this.editorValue += '[type="goalscorers" league-id="' + league.league_id + '"]';
  }
  onMatchResultModalClosed(match) {
    this.editorValue += '[type="match-result" match-id="' + match + '"]';
  }



  /*openStandingsModal() {
    const initialState = {
      leagues: this.LeaguesData ? this.LeaguesData : []
    };
    this.bsModalRef = this.modalService.show(ModalStandingsComponent, {initialState});
  }

  openGoalscorrersModal() {
    const initialState = {
      leagues: this.LeaguesData ? this.LeaguesData : []
    };
    this.bsModalRef = this.modalService.show(ModalGoalscorrersComponent, {initialState});
  }

  openMatchResultModal() {
    this.bsModalRef = this.modalService.show(ModalResultsComponent);
  }*/

    onWatermarkChange(e) {
      this.ItemData.watermark = e.target.value;
    }


    onItemSelect(item: any) {
        // console.log(item);
    }
    onSelectAll(items: any) {
        // console.log(items);
    }

    getFormData(e) {
      if (e instanceof Event) {
        e.preventDefault();
      }
      const data: any = Lib.getFormData(e);

      data.content = this.editorValue;
      data.categories = [];
      data.tags = [];
      data.players = [];
      data.leagues = [];
      data.teams = [];
      data.hashtags = JSON.stringify(this.ItemData.hashtags);
      data.watermark = this.ItemData.watermark;

      data.main_gallery_item_id = this.ItemData.main_gallery_item_id ? this.ItemData.main_gallery_item_id : '';

      if (this.ItemData.categories && this.ItemData.categories.length) {
        for (const it of  this.ItemData.categories) {
          data.categories.push(it.id);
        }
      }

      if (this.ItemData.tags && this.ItemData.tags.length) {
        for (const it of  this.ItemData.tags) {
          data.tags.push(it.id);
        }
      }

      if (this.ItemData.leagues && this.ItemData.leagues.length) {
        for (const it of  this.ItemData.leagues) {
          data.leagues.push(it.league_id);
        }
      }

      if (this.ItemData.teams && this.ItemData.teams.length) {
        for (const it of  this.ItemData.teams) {
          data.teams.push(it.team_id);
        }
      }

      if (this.ItemData.players && this.ItemData.players.length) {
        for (const it of  this.ItemData.players) {
          data.players.push(it.player_id);
        }
      }

      return data;
    }

    saveDraft(data) {
      data.is_draft = 1;
      let id: any = '';

      if (this.id !== 'add') {
        id = '/' + this.id + '?isedit=1';
      }

      this._httpService.postData('articles' + id, data).subscribe(
        data => this.ItemData = data,
        error => alert(error),
        () => this.checkAction()
      );
    }

    saveItem(e) {
        const data = this.getFormData(e);
        let id: any = '';

        if (this.id !== 'add') {
            id = '/' + this.id + '?isedit=1';
        }

        this.saveLoader = true;

        this._httpService.postData('articles' + id, data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );
    }


    checkAction() {
      const itm = JSON.parse(this.ItemData._body);
        if (this.id == 'add') {
            this.router.navigate(['articles/' + itm.id]);
            this.id = itm.id;
            this.getItem();
        } else {
            this.generateItem();
        }

        this.saveLoader = false;
    }


  getCategories() {
    this._httpService.getData('categories?withHidden=true').subscribe(
      data => this.CategoriesData = data,
      error => alert(error),
      () => this.generateCategories()
    );
  }

  getHashtags() {
    this._httpService.getData('hashtags').subscribe(
      data => this.hashtagData = data,
      error => alert(error),
      () => this.generateHashtags()
    );
  }

    generateCategories() {
        const cats = JSON.parse(this.CategoriesData._body);
        // console.log(cats);
        const new_data = [{ id: '', title: 'აირჩიეთ კატეგორია', selected: false }];

        for (let i = 0; i < cats.length; i++) {
            new_data.push({ id: cats[i].id, title: cats[i].title, selected: false });
            if (cats[i].children.length > 0) {
                for (let j = 0; j < cats[i].children.length; j++) {
                    new_data.push({ id: cats[i].children[j].id, title: '-- ' + cats[i].children[j].title, selected: false });
                }
            }
        }

        // console.log(new_data);

        this.CategoriesData = new_data;
    }

    getLeagues() {
      this._httpService.getData('leagues').subscribe(
        data => this.LeaguesData = data,
        error => alert(error),
        () => this.generateLeagues()
      );
    }

    onArticleFilterChange(keyword) {
      if (keyword.length > 3) {
        this.articleKeyword = keyword;
        this.getArticles();
      }
    }

    onArticleSelect(item) {
      /*let text = '[article-id="' + item.id + '"';
      if(this.insertArticleItemWithPic) {
        text += ' picture="1"';
      }
      text += ']';*/
// <p><a href="link" style="display: block"><img src="https://storage.goal.ge/size/timthumb.php?src=/uploads/posts/l1wwG2EgAQOn0pXbc1fYp5nfHNCS3j4Q.jpg&amp;w=150" style="margin-right:10px; vertical-align:middle" /> <strong>title</strong></a></p>
      item = this.ArticlesData.find(o => o.id == item.id);
      let picTag = '';
      if(item.main_gallery_item && item.main_gallery_item.filename_preview && this.insertArticleItemWithPic) {
        picTag = '<img style="vertical-align:middle; margin-right: 17px;width: 70px;height: 70px;object-fit: cover;border-radius: 2px;" src="https://storage.goal.ge/size/timthumb.php?src=/uploads/posts/'+ item.main_gallery_item.filename_preview +'&w=300" />';
      }

      const html = '<div class="linked-news" style="margin-top: 8px; margin-bottom: 8px">' +
        '<a style="color: #000000; text-decoration: none;line-height: 1rem;display: flex;background: #F4F4F4;border-radius: 5px;width: 100%;height: 85px;align-items: center;padding: 8px;" href="/news/'+item.id+'/'+item.slug+'">' +
        picTag +
        '<strong><span style="font-size: 1rem">'+item.title+'</span></strong>' +
        '</a>' +
        '</div>';

      this.editorValue += html;
      this.insertArticleItem = {  };
      //document.getElementById('insertArticle').childNodes[0].click();
    }

    getArticles() {
      this._httpService.getData('articles/search?q=' + this.articleKeyword).subscribe(
        data => this.ArticlesData = data.json().data.length > 0 ? data.json().data : [{ id: 0, title: 'აირჩიეთ სტატია' }],
        error => alert(error),
        () => this.generateArticles()
      );
    }

    generateArticles() {

    }

    generateLeagues() {
        const data = JSON.parse(this.LeaguesData._body);
        this.LeaguesData = data.data;
    }

    generateHashtags() {
        const data = JSON.parse(this.hashtagData._body);
        this.hashtagData = data.data;
    }

    removeTeam(index) {
        this.ItemData.teams.splice(index, 1);
    }

    searchTeam(e) {
        if (e.target.value.length > 2) {
            this.getTeams(e.target.value);
        } else {
            this.TeamsData = [];
        }
    }

    async getTeams(name) {
        const res: any = await this._httpService.getData('teams/search/' + name).toPromise();
        this.TeamsData = JSON.parse(res._body);
    }

    selectTeam(team_id, name) {
        this.ItemData.teams.push({'team_id': team_id, 'name': name});
        this.TeamsData = [];
    }

    getItem() {
        this._httpService.getData('articles/' + this.id + '?isedit=1').subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );

    }

    generateItem() {
        const cat = JSON.parse(this.ItemData._body);
        this.ItemData = cat;

        this.editorValue = this.ItemData.content;


        if (this.ItemData.main_gallery_item != null) {
            this.mainimg = this.ItemData.main_gallery_item.filename_preview;
        }


        this.getTags();
        this.getCategories();
        this.getHashtags();
        this.getLeagues();

        this.saveLoader = false;
        // this.getTeams();
    }

    uploadGalleryItem(e) {
        e.preventDefault();
        const data: any = {
            title: null,
            show_in_video_gallery: false,
            categories: [],
            file: [],
        };

        if (e.target.parentNode.children[0].value != '') {
            const selected_f = e.target.parentNode.children[0].files[0];
            selected_f['input_name'] = 'files[]';
            data['file'].push(selected_f);
            this._httpService.postData( 'gallery/upload' , data).subscribe(
                data => this.uploadedFile = data,
                error => alert(error),
                () => this.uploadGalleryItemF()
            );

        }

    }

    uploadGalleryItemF() {
        const img = JSON.parse(this.uploadedFile._body);
        this.uploadedFile = img;
        this.ItemData.main_gallery_item = this.uploadedFile[0];
        this.mainimg = this.ItemData.main_gallery_item.filename_preview;
        this.ItemData.main_gallery_item_id = this.uploadedFile[0].id;
    }



    getTags() {
        this._httpService.getData('tags').subscribe(
            data => this.TagsData = data,
            error => alert(error),
            () => this.generateTags()
        );

    }

    generateTags() {
        const tags = JSON.parse(this.TagsData._body);
        this.TagsData = tags;
    }

    ngAfterViewInit() {

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    getPlayers(s) {
        this._httpService.getData('livescoreplayers/search/' + s).subscribe(
            data => this.PlayersData = data,
            error => alert(error),
            () => this.generatePlayers()
        );

    }

    generatePlayers() {
        const players = JSON.parse(this.PlayersData._body);
        this.PlayersData = [];
        let lngth = players.length;
        if (lngth > 7) {
            lngth = 7;
        }
        for (let i = 0; i < lngth; i ++) {
            this.PlayersData.push(players[i]);
        }


    }

    searchPlayer(e) {
        if (e.target.value.length > 2) {
            this.getPlayers(e.target.value);
        } else {
            this.PlayersData = [];
        }
    }

    selectPlayer(player_id, fullname) {
        this.ItemData.players.push({'player_id': player_id, 'fullname': fullname});
        this.PlayersData = [];
    }

    removePlayer(index) {
        this.ItemData.players.splice(index, 1);
    }

}
