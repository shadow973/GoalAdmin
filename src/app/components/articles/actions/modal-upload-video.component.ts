import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'modal-upload-video',
  template: `
    <button type="button" class="btn btn-primary d-inline-block mr-3" (click)="showModal()">ვიდეოს ატვირთვა</button>
    <div class="modal fade" bsModal #modal="bs-modal"
         tabindex="-1" role="dialog" aria-labelledby="dialog-events-name">
      <div class="modal-dialog modal-md">
        <div class="modal-header">
          <h4 class="modal-title pull-left">ვიდეოს ატვირთვა</h4>
          <button type="button" class="close pull-right" aria-label="Close" (click)="modal.hide()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <iframe src="https://v2.admin.goal.ge/videos/add" class="iframe"></iframe>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" (click)="modal.hide()">დახურვა</button>
        </div>
      </div>
    </div>
  `
})

export class ModalUploadVideoComponent implements OnInit {
  @ViewChild(ModalDirective, { read: false }) modal: ModalDirective;

  ngOnInit() {

  }

  showModal() {
    this.modal.show();
  }
}
