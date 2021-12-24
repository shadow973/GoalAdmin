import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';
@Component({
  selector: 'modal-standings-component',
  template: `
    <button type="button" class="btn btn-primary d-inline-block mr-3" (click)="showModal()">სატურნირო ცხრილის ჩასმა</button>
    <div class="modal fade" bsModal #modal="bs-modal"
         tabindex="-1" role="dialog" aria-labelledby="dialog-events-name">
      <div class="modal-dialog modal-md">
        <div class="modal-header">
          <h4 class="modal-title pull-left">დაამატეთ სატურნირო ცხრილი</h4>
          <button type="button" class="close pull-right" aria-label="Close" (click)="modal.hide()">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="league">აირჩიეთ ლიგა</label>
            <div class="d-block">
              <ng-multiselect-dropdown id="league"
                                       class="w-100"
                                       name="leagueID"
                                       [(ngModel)]="league"
                                       [data]="leagues"
                                       [settings]="dropdownSettings">
              </ng-multiselect-dropdown>
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

export class ModalStandingsComponent implements OnInit {
  @ViewChild(ModalDirective, { read: false }) modal: ModalDirective;
  @Output() added = new EventEmitter();
  @Input() leagues;

  dropdownSettings: {};
  league: any[];

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'league_id',
      textField: 'translated_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true,
      allowRemoteDataSearch: true,
      closeDropDownOnSelection: true
    };
  }

  showModal() {
    this.modal.show();
  }

  add() {
    if (this.league.length > 0) {
      this.added.emit(this.league[0]);
    }

    this.modal.hide();
  }
}
