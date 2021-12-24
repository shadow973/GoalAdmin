import { Component } from '@angular/core';
import { HTTPService } from '../../http.service';

@Component({
    // moduleId: module.id,
    selector: 'content-component-comments',
    templateUrl: 'comments.component.html',
    styleUrls: ['comments.component.css'],
    providers: [HTTPService]
})

export class CommentsComponent {
    constructor(private _httpService: HTTPService) {
        this.getItems();
    }

    ItemsData: any = [];
    chelectedItems = [];

    getItems() {
        this._httpService.getData('comments').subscribe(
            data => this.ItemsData = data,
            error => alert(error),
            () => this.generategetItems()
        );

    }

    generategetItems() {
        var items = JSON.parse(this.ItemsData._body);
        console.log(items);
        this.ItemsData = items.data;
    }

    activeActions(th) {
        th.target.parentElement.parentElement.classList.toggle('show');
    }

    selectItem(e, id) {
        if (e.target.checked) {
            this.chelectedItems.push(id)
        } else {
            var index = this.chelectedItems.indexOf(id, 0);
            if (index > -1) {
                this.chelectedItems.splice(index, 1);
            }
        }

        console.log(this.chelectedItems);

    }


    delete(id: any) {
        if (confirm("Are you sure to delete it?")) {

            this._httpService.getData('comments/delete/' + id).subscribe(
                () => this.getItems()
            );

        }

    }

    deleteItems(){
        if (confirm("Are you sure to delete it?")) {
            var data = {items: this.chelectedItems}
            this._httpService.postData('comments/delete', data).subscribe(
                () => this.getItems()
            );

            this.chelectedItems = [];

        }
    }
}