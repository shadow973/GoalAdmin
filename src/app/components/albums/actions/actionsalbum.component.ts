import { Component, ElementRef } from '@angular/core';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';
import { Router } from '@angular/router';


@Component({
    // moduleId: module.id,
    selector: 'content-component-actionsalbum',
    templateUrl: 'actionsalbum.component.html?v=${new Date().getTime()}',
    styleUrls: ['actionsalbum.component.css?v=${new Date().getTime()}'],
    providers: [HTTPService]
})

export class ActionsAlbumComponent {
    id: any;
    storage_url: string;
    private sub: any;
    public ItemData: any = {
        title: '',
        gallery_items: []
    };

    uploadedFile: any = [];
    CategoriesData: any = [];
    selectedCategories: any = [];
    dropdownSettingsCats: any = {};

    constructor(private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute, private router:Router) {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        this.storage_url = AppSettings.STORAGE_URL;
        if (this.id != 'add') {
            this.id = parseInt(this.id);
            this.getItem(); 
        }else{
            this.getCategories();
        }
    }

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

    }

    saveItem(e) {
        e.preventDefault();
        let data: any = Lib.getFormData(e, false);
        data['gallery_item_ids'] = [];

        for (let itm of this.ItemData.gallery_items) {
            data.gallery_item_ids.push(itm.id);
        }

        // data['gallery_items'] = this.ItemData.gallery_items;

        let id:any = '';

        if(this.id != 'add'){
            id = '/'+this.id;
        }

        console.log(data);

        this._httpService.postData('albums' + id, data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['albums/'+ itm.id]);
        }else{
            this.generateItem()
        }
    }

    deleteGalleryItem(i) {
        this.ItemData.gallery_items.splice(i, 1);
    }

    getItem() {
        this._httpService.getData('albums/' + this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );

        this.getCategories();

    }

    generateItem() {
        var cat = JSON.parse(this.ItemData._body);
        if (cat.background_image != null) {
            cat.background_image = AppSettings.STORAGE_URL + cat.background_image;
        }

        if (cat.image != null) {
            cat.image = AppSettings.STORAGE_URL + cat.image;
        }
        this.ItemData = cat;
    }

    uploadGalleryItem(e) {
        e.preventDefault();
        let data: any = {
            title: null,
            show_in_video_gallery: false,
            categories: [],
            file: [],
        };

        if (e.target.parentNode.children[0].value != '') {
            var selected_f = e.target.parentNode.children[0].files[0];
            selected_f['input_name'] = 'files[]';
            data['file'].push(selected_f);
            this._httpService.postData('gallery/upload', data).subscribe(
                data => this.uploadedFile = data,
                error => alert(error),
                () => this.uploadGalleryItemF()
            );

        }

    }

    uploadGalleryItemF() {
        var img = JSON.parse(this.uploadedFile._body);
        this.uploadedFile = img;
        this.ItemData.gallery_items.push(this.uploadedFile[0]);

    }


    getCategories() {
        this._httpService.getData('categories?withHidden=true').subscribe(
            data => this.CategoriesData = data,
            error => alert(error),
            () => this.generateCategories()
        );

    }

    generateCategories() {
        var cats = JSON.parse(this.CategoriesData._body);
        // console.log(cats);
        var new_data = [{ id: '', title: 'აირჩიეთ კატეგორია', selected: false }];

        for (var i = 0; i < cats.length; i++) {
            new_data.push({ id: cats[i].id, title: cats[i].title, selected: false });
            if (cats[i].children.length > 0) {
                for (var j = 0; j < cats[i].children.length; j++) {
                    new_data.push({ id: cats[i].children[j].id, title: '-- ' + cats[i].children[j].title, selected: false });
                }
            }
        }

        // console.log(new_data);

        this.CategoriesData = new_data;
    }


    ngOnDestroy() {
        this.sub.unsubscribe();
    }



}