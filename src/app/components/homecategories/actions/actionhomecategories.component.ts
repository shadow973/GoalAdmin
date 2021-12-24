import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';


@Component({
    // moduleId: module.id,
    selector: 'content-component-actionshomecategory',
    templateUrl: 'actionshomecategory.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actionshomecategory.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService, Lib]
})

export class ActionsHomeCategoryComponent{
    id: any;

    storage_url:string;
    private sub: any;
    public CategoryData:any = {
        color:'',
        category_id: 0 
    };
    postData:any ;
    CategoriesData: any = [];

    constructor( private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute ){
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; 
         });

         this.storage_url = AppSettings.STORAGE_URL;
        //  this.getCategory();

        if(this.id != 'add') {
            this.id = parseInt(this.id);
            this.getCategory();
        }else{
            this.getCategories();
        }

        
    }

    ngOnInit() {
        
    }

    saveCategory(e){

        e.preventDefault();
        let data:any = Lib.getFormData(e);

        let id:any = '';

        if(this.id != 'add'){
            id = '/'+this.id;
        }

        this._httpService.postData( 'home-categories'+id , data).subscribe(
            data => this.CategoryData = data,
            error => alert(error),
            () => this. generateCategory()
        );

    }


    getCategories(){
        this._httpService.getData('categories?withHidden=true').subscribe(
            data => this.CategoriesData = data,
            error => alert(error),
            () => this.generateCategories()
        );
       
    }

    generateCategories(){
        var cats = JSON.parse(this.CategoriesData._body);
        // console.log(cats);
        var new_data = [{id:'', title: 'აირჩიეთ კატეგორია', selected: false }];

        for(var i=0; i < cats.length; i++ ){            
            new_data.push({ id:cats[i].id, title:cats[i].title, selected:false });
            if(cats[i].children.length > 0){
                for(var j=0; j < cats[i].children.length; j++ ){
                    new_data.push({ id: cats[i].children[j].id, title: '-- '+cats[i].children[j].title,  selected:false });
                }
            }
        }

        // console.log(new_data);

        this.CategoriesData = new_data;
    }


    getCategory(){
        this._httpService.getData('home-categories/'+this.id).subscribe(
            data => this.CategoryData = data,
            error => alert(error),
            () => this.generateCategory()
        );
    
    }

    generateCategory(){
        var cat = JSON.parse(this.CategoryData._body);
        this.CategoryData = cat;

        this.getCategories();
    }

    
      ngOnDestroy() {
        this.sub.unsubscribe();
      }

}