import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AppSettings } from '../../../config/config.module';


@Component({
    // moduleId: module.id,
    selector: 'content-component-actionscategory',
    templateUrl: 'actionscategory.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actionscategory.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsCategoryComponent{
    id: any;

    storage_url:string;
    private sub: any;
    public CategoryData:any = {
        title: '',
        background_image: null,
        image: null,
        is_visible:0,
        parent_id:null
    };
    postData:any ;
    CategoriesData: any = [];

    saveLoader = false;

    constructor( private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute, private router:Router ){
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id']; 
         });

         this.storage_url = AppSettings.STORAGE_URL;
         this.getCategories();
         this.storage_url = AppSettings.STORAGE_URL;

         if (this.id != 'add') {
             this.id = parseInt(this.id);
             this.getCategory();
         }else{
             
         }
        
    }

    ngOnInit() {
        
    }
    saveCategory(e){
        e.preventDefault();
        console.log(e);
        var data = {};
        data['file'] = [];
        this.saveLoader = true;
        const uploadData = new FormData();
        // uploadData.append('myFile', this.selectedFile, this.selectedFile.name);

        for(var i = 0; i < e.target.elements.length; i++){

            if( e.target.elements[i].type == 'checkbox' ){
                
                if( e.target.elements[i].checked ){
                    data[e.target.elements[i].name] = 1;
                }
            }else{
                
            if(e.target.elements[i].type == 'file'){
                
                if(e.target.elements[i].value != ''){
                    var selected_f = e.target.elements[i].files[0];
                    selected_f['input_name'] =e.target.elements[i].name;
                    data['file'].push(selected_f);
                }
                
            }else{
                data[e.target.elements[i].name] = e.target.elements[i].value;
            }
                
            }

        }

        let id:any = '';

        if(this.id != 'add'){
            id = '/'+this.id;
        }

        this._httpService.postData( 'categories'+id , data).subscribe(
            data => this.CategoryData = data,
            error => alert(error),
            () => this. checkAction()
        );

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.CategoryData._body);
            this.router.navigate(['categories/'+ itm.id]);
        }else{
            this.generateCategory()
        }
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
        var new_data = [{id:'0', title: 'აირჩიეთ კატეგორია' }];

        for(var i=0; i < cats.length; i++ ){            
            new_data.push({ id:cats[i].id, title:cats[i].title });
            if(cats[i].children.length > 0){
                for(var j=0; j < cats[i].children.length; j++ ){
                    new_data.push({ id: cats[i].children[j].id, title: '-- '+cats[i].children[j].title });
                }
            }
        }

        // console.log(new_data);

        this.CategoriesData = new_data;
    }


    getCategory(){
        this._httpService.getData('categories/'+this.id+'?single=true').subscribe(
            data => this.CategoryData = data,
            error => alert(error),
            () => this.generateCategory()
        );
    
    }

    generateCategory(){
        var cat = JSON.parse(this.CategoryData._body);
        // console.log(cat);
        if(cat.background_image != null){
            cat.background_image = AppSettings.STORAGE_URL + cat.background_image;
        }

        if(cat.image != null){
            cat.image =  AppSettings.STORAGE_URL + cat.image;
        }
        this.CategoryData = cat;
        this.saveLoader = false;
        this.getCategories();
    }

    
      ngOnDestroy() {
        this.sub.unsubscribe();
      }

}