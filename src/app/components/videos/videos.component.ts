import { Component  } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-videos',
    templateUrl: 'videos.component.html',
    styleUrls: [ 'videos.component.css' ],
    providers: [HTTPService]
})

export class VideosComponent{
    constructor( private _httpService: HTTPService){
        this.getVideos();
    }

    VideosData: any = [];

    getVideos(){
        this._httpService.getData('new_videos').subscribe(
            data => this.VideosData = data,
            error => alert(error),
            () => this.generategetVideos()
        );
       
    }

    generategetVideos(){
        var videos = JSON.parse(this.VideosData._body);
        // console.log(videos);
        this.VideosData = videos;
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }
}