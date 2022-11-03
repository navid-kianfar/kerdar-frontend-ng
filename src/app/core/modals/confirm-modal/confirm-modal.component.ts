import {Component, Inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {ConfirmModalRequest, ConfirmModalResponse} from '../../types/shared-dtos';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  agreed: boolean = false;

  constructor(
    public dialogRef: DialogRef<ConfirmModalResponse>,
    @Inject(DIALOG_DATA) public data: ConfirmModalRequest
  ) { }

  ngOnInit(): void {
    this.data.cancelLabel = this.data.cancelLabel || 'Cancel';
    this.data.confirmLabel = this.data.confirmLabel || 'Confirm';
    this.data.icon = this.data.icon || 'ti ti-alert-octagon';
  }

}
