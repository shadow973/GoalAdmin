import { Component , ElementRef } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-tvprograms',
    templateUrl: 'tvprograms.component.html',
    styleUrls: [ 'tvprograms.component.css' ],
    providers: [HTTPService]
})

export class TVProgramsComponent{
    constructor( private _httpService: HTTPService, private elRef: ElementRef ){
        this.getTVPrograms();
    }

    TVProgramsData: any = [];

    postData: any;

    getTVPrograms(){
        this._httpService.getData('tv-programs').subscribe(
            data => this.TVProgramsData = data,
            error => alert(error),
            () => this.generateTVPrograms()
        );
       
    }

    generateTVPrograms(){
        var tvprograms = JSON.parse(this.TVProgramsData._body);
        console.log(tvprograms);
        this.TVProgramsData = tvprograms;
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}