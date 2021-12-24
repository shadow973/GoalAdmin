import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-homecategories',
    templateUrl: 'homecategories.component.html',
    styleUrls: [ 'homecategories.component.css' ],
    providers: [HTTPService]
})

export class HomeCategoriesComponent{
    constructor( private _httpService: HTTPService, private elRef: ElementRef ){
        this.getCategories();
    }

    CategoriesData: any = [];

    postData: any;

    getCategories(){
        this._httpService.getData('home-categories').subscribe(
            data => this.CategoriesData = data,
            error => alert(error),
            () => this.generateCategories()
        );
       
    }

    generateCategories(){
        var cats = JSON.parse(this.CategoriesData._body);
        console.log(cats);
        this.CategoriesData = cats;
    } 

    delete(id:any){

        let data = { _method: 'DELETE' };

        this._httpService.postData( 'home-categories/'+id , data).subscribe(
            // error => alert(error),
            () => this.getCategories()
        );
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}