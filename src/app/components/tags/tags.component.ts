import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-tags',
    templateUrl: 'tags.component.html',
    styleUrls: [ 'tags.component.css' ],
    providers: [HTTPService]
})

export class TagsComponent{
    constructor( private _httpService: HTTPService, private elRef: ElementRef ){
        this.getTags();
    }

    TagsData: any = [];

    postData: any;

    getTags(){
        this._httpService.getData('tags').subscribe(
            data => this.TagsData = data,
            error => alert(error),
            () => this.generateTags()
        );
       
    }

    generateTags(){
        var tags = JSON.parse(this.TagsData._body);
        console.log(tags);
        this.TagsData = tags;
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}