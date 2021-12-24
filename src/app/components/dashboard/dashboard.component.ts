import { Component, ElementRef, ViewChild } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})

export class DashboardComponent{

    @ViewChild('myId') myId: ElementRef;

    constructor( private _httpService: HTTPService){
        this.getUserStats();
        this.getTopNews();
    }

    userStats: any = [];
    topNews: any = [];

    getUserStats(){
        console.log('asd');
        
        this._httpService.getData('articles/userstats').subscribe(
            data => this.userStats = data,
            error => alert(error),
            () => {
                var stats = JSON.parse(this.userStats._body);
                const newStats = [];                
                for(const st in stats){
                    newStats.push(stats[st]);
                }
                this.userStats = newStats;
            }
        );
       
    }

    getTopNews(){
        this._httpService.getData('articles/top').subscribe(
            data => this.topNews = data,
            error => alert(error),
            () => {  this.topNews = JSON.parse(this.topNews._body);  }
        );
    }


    test(){
        this.myId.nativeElement.classList.toggle('asss')
        console.log(this.myId);
    }

    private deleteCookie(name) {
        this.setCookie(name, '', -1);
    }

    private setCookie(name: string, value: string, expireDays: number, path: string = '') {
        let d:Date = new Date();
        d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
        let expires:string = `expires=${d.toUTCString()}`;
        let cpath:string = path ? `; path=${path}` : '';
        document.cookie = `${name}=${value}; ${expires}${cpath}`;
    }

}