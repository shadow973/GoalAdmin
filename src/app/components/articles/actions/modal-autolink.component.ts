import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-autolink-component',
  styles: [
    '.c-pointer { cursor:pointer }'
  ],
  template: `
    <button type="button" class="btn btn-primary d-inline-block mr-3" (click)="showModal()">სიტყვების ავტომატური გალინკვა</button>
    <div class="modal fade" bsModal #modal="bs-modal"
         tabindex="-1" role="dialog" aria-labelledby="dialog-events-name"
         (onHide)="onHide($event)">
      <div class="modal-dialog modal-md">
        <div class="modal-header">
          <h4 class="modal-title pull-left">დაამატეთ/წაშალეთ სიტყვები</h4>
          <button type="button" class="close pull-right" aria-label="Close" (click)="modal.hide()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>სიტყვა</label>
            <div class="d-flex">
              <input class="form-control mr-2 ng-untouched ng-pristine ng-valid" type="text" [(ngModel)]="word">
            </div>
          </div>
          <div class="form-group">
            <label>ლინკი</label>
            <div class="d-flex">
              <input class="form-control mr-2 ng-untouched ng-pristine ng-valid" type="text" [(ngModel)]="link">
            </div>
          </div>
          <div class="form-group">
            <label>ლინკების რაოდენობა</label>
            <div class="d-flex">
              <input class="form-control mr-2 ng-untouched ng-pristine ng-valid" type="text" [(ngModel)]="max_number">
            </div>
          </div>
          <div class="form-group">
            <label class="custom-control custom-checkbox gallery-uploader__checkbox">
              <input class="custom-control-input ng-untouched ng-pristine ng-valid" type="checkbox" [(ngModel)]="open_new_tab">
              <span class="custom-control-indicator"></span>
              <span class="custom-control-description">გაიხსნას ახალ ტაბში?</span>
            </label>
          </div>
          <div class="form-group text-right">
            <button type="button" (click)="saveAnchor()">დამატება</button>
          </div>

          <ul class="list-group" *ngIf="anchors.length">
            <li (click)="deleteAnchor(i)" class="list-group-item d-block" *ngFor="let item of anchors; let i = index">{{ item.word }}
              <i class="material-icons float-right text-danger c-pointer">delete</i>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" (click)="modal.hide()">დახურვა</button>
        </div>
      </div>
    </div>
  `
})

export class ModalAutolinkComponent implements OnInit {
  @ViewChild(ModalDirective, { read: false }) modal: ModalDirective;
  @Output() closed = new EventEmitter();
  @Input() anchors: any[];

  word;
  link;
  max_number;
  open_new_tab;


  ngOnInit() {
    this.max_number = 10;
    this.open_new_tab = true;
  }

  showModal() {
    this.modal.show();
  }

  onHide($event: ModalDirective) {
    this.closed.emit(this.anchors);
  }

  saveAnchor() {
    if (this.word.length > 0 && this.link.length > 0) {
      this.anchors.push({ word: this.word, link: this.link, max_number: this.max_number, open_new_tab: this.open_new_tab });

      this.word = '';
      this.link = '';
      this.max_number = 10;
      this.open_new_tab = true;
    }
  }

  deleteAnchor(i) {
    this.anchors.splice(i, 1);
  }
}
