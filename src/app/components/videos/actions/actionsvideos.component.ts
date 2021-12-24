import { Component , ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../../../http.service';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../../config/config.module';
import { Lib } from '../../../libraries/lib.module';




@Component({
    // moduleId: module.id,
    selector: 'content-component-actionsvideos',
    templateUrl: 'actionsvideos.component.html?v=${new Date().getTime()}',
    styleUrls: [ 'actionsvideos.component.css?v=${new Date().getTime()}' ],
    providers: [HTTPService]
})

export class ActionsVideosComponent{
    id: any;
    storage_url:string;
    private sub: any;

    public ItemData:any = {
        video_id : 0
    };

    constructor( private _httpService: HTTPService, private elRef: ElementRef, private route: ActivatedRoute, private router:Router ){
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
         });

         this.storage_url = AppSettings.STORAGE_URL;

        if (this.id != 'add') {
            this.id = parseInt(this.id);
            this.getItem();
        }else{

        }

    }

    uploadedFile: any = [];
    showLoader = false;
    saveLoader = false;

    ngOnInit() {

    }

    saveItem(e){
        e.preventDefault();
        let data:any = Lib.getFormData(e);
        let id:any = '';
        if(this.id != 'add'){
            id = '/'+this.id;
        }
        this.saveLoader = true;
        this._httpService.postData( 'new_videos/item'+id , data).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.checkAction()
        );

    }

    checkAction(){
        if (this.id == 'add') {
            var itm = JSON.parse(this.ItemData._body);
            this.router.navigate(['videos/'+ itm.id]);
        }else{
            this.generateItem()
        }

        this.saveLoader = false;
    }


    getItem(){

        this._httpService.getData('new_videos/item/'+this.id).subscribe(
            data => this.ItemData = data,
            error => alert(error),
            () => this.generateItem()
        );

    }

    generateItem(){
        var itm = JSON.parse(this.ItemData._body);
        this.ItemData = itm;
        this.saveLoader = false;
    }


    uploaVideo(e) {
        e.preventDefault();
        let data: any = {
            file: [],
        };

        if (e.target.parentNode.children[0].value != '') {
            var selected_f = e.target.parentNode.children[0].files[0];
            selected_f['input_name'] = 'video';
            data['file'].push(selected_f);
            this.showLoader = true;
            this._httpService.postData('new_videos/upload', data).subscribe(
                data => this.uploadedFile = data,
                error => alert(error),
                () => this.uploadVideoF()
            );

        }

    }

    uploadVideoF() {
        var video = JSON.parse(this.uploadedFile._body);
        this.uploadedFile = video;
        this.ItemData.video_url = this.uploadedFile.video_url;
        this.ItemData.video_id = this.uploadedFile.id;

        this.showLoader = false;

    }

    copyToClipboard( val ){
        val = '[type="video" id="'+val+'"]';
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


}
