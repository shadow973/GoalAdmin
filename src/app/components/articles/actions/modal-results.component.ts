import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'modal-results-component',
  template: `
    <button type="button" class="btn btn-primary d-inline-block mr-3" (click)="showModal()">მატჩის შედეგის ჩასმა</button>
    <div class="modal fade" bsModal #modal="bs-modal"
         tabindex="-1" role="dialog" aria-labelledby="dialog-events-name">
      <div class="modal-dialog modal-md">
        <div class="modal-header">
          <h4 class="modal-title pull-left">დაამატეთ მატჩის შედეგი</h4>
          <button type="button" class="close pull-right" aria-label="Close" (click)="modal.hide()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="league">ჩაწერეთ მატჩის ID</label>
            <div class="d-flex">
              <input class="form-control" id="matchID" name="matchID" [(ngModel)]="matchID" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" (click)="add()">დამატება</button>
          <button type="button" class="btn btn-default" (click)="modal.hide()">დახურვა</button>
        </div>
      </div>
    </div>
  `
})

export class ModalResultsComponent implements OnInit {
  @ViewChild(ModalDirective, { read: false }) modal: ModalDirective;
  @Output() added = new EventEmitter();

  matchID: '';

  ngOnInit() {
  }

  showModal() {
    this.modal.show();
  }

  add() {
    this.added.emit(this.matchID);

    this.modal.hide();
  }
}
