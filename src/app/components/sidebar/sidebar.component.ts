import { Component  } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-albums',
    templateUrl: 'sidebar.component.html',
    styleUrls: [ 'sidebar.component.css' ],
    providers: [HTTPService]
})

export class SidebarComponent{
    constructor( private _httpService: HTTPService){
        this.getItems();
        this.getLivescoreStatus();
    }

    ItemsData: any = [];
    LiveScoreStatusData: any = {};
    LivescoreStatus = 0;
    LivescoreStatuses = [
        {
            value:0,
            label: 'გამორთული'
        },
        {
            value:1,
            label: 'ჩართული'
        },
    ]

    livescoreChange(value){
        console.log(value);
        const data = {
            status: value
        }
        
        this._httpService.postData('livescorestatus/update', data).subscribe(
            data => this.LiveScoreStatusData = data,
            error => alert(error),
            () => {
                console.log(this.LiveScoreStatusData);                
            }

        );
        
    }

    getLivescoreStatus(){
        this._httpService.getData('livescorestatus').subscribe(
            data => this.LiveScoreStatusData = data,
            error => alert(error),
            () => {
                const res = JSON.parse(this.LiveScoreStatusData._body);
                this.LivescoreStatus = res.status;
            }
        );
    }

    getItems(){
        this._httpService.getData('sidebar').subscribe(
            data => this.ItemsData = data,
            error => alert(error),
            () => this.generategetItems()
        );
       
    }

    generategetItems(){
        var items = JSON.parse(this.ItemsData._body);
        console.log(items);
        this.ItemsData = items;
    }

    activeActions(th){
        th.target.parentElement.parentElement.classList.toggle('show');
    }

    itemMove(i, act){
        if(i == 0 && act == 'up'){
            return false;
        }
        if(i == (this.ItemsData.length - 1) && act == 'down'){
            return false;
        }

        var j = i;
        if(act == 'up'){
            j--;
        }else{
            j++;
        }

        var sec = this.ItemsData[j];
        this.ItemsData[j] = this.ItemsData[i]; 
        this.ItemsData[i] = sec;
        this.update();
    }

    update(){
        let ids = [];
        for(let i=0;i < this.ItemsData.length; i++){
            ids.push(this.ItemsData[i].id);
        }

        var data = {
            ids : ids.join(',')
        }

        this._httpService.postData('sidebar/update', data).subscribe(
            data => this.ItemsData = data,
            error => alert(error),
            () => this.generategetItems()

        );
    }

    
}
