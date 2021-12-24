import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';
import { AppSettings } from '../../config/config.module';

@Component({
    // moduleId: module.id,
    selector: 'content-component-categories',
    templateUrl: 'categories.component.html',
    styleUrls: [ 'categories.component.css' ],
    providers: [HTTPService]
})

export class CategoriesComponent{
    constructor( private _httpService: HTTPService, private elRef: ElementRef ){
        this.getCategories();
        this.apiurl = AppSettings.API_URL;
    }

    CategoriesData: any = [];

    postData: any;
    apiurl:string = "";

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
        this.CategoriesData = cats;
    }

    delete(id:any){

        let data = { _method: 'DELETE' };

        this._httpService.postData( 'categories/'+id , data).subscribe(
            // error => alert(error),
            () => this.getCategories()
        );
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}