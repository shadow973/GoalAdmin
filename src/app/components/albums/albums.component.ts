import { Component  } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-albums',
    templateUrl: 'albums.component.html',
    styleUrls: [ 'albums.component.css' ],
    providers: [HTTPService]
})

export class AlbumsComponent{
    constructor( private _httpService: HTTPService){
        this.getAlbums();
    }

    AlbumsData: any = [];

    getAlbums(){
        this._httpService.getData('albums').subscribe(
            data => this.AlbumsData = data,
            error => alert(error),
            () => this.generategetAlbums()
        );
       
    }

    generategetAlbums(){
        var albums = JSON.parse(this.AlbumsData._body);
        console.log(albums);
        this.AlbumsData = albums;
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}