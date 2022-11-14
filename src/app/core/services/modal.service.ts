import { Injectable } from '@angular/core';
import {Dialog, DialogRef} from '@angular/cdk/dialog';
import {ComponentType} from '@angular/cdk/overlay';
import {ConfirmModalRequest, ConfirmModalResponse} from '../types/shared-dtos';
import {ConfirmModalComponent} from '../modals/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: Dialog) { }

  show<T, O>(component: ComponentType<any>, data: T): Promise<O> {
    return new Promise<O>((resolve) => {
      const dialog = this.dialog.open<any>(component, {data});
      dialog.closed.subscribe((result) => resolve(result));
    });
  }

  confirm(data: ConfirmModalRequest): Promise<ConfirmModalResponse> {
    return new Promise<ConfirmModalResponse>((resolve) => {
      const dialog = this.dialog.open<any>(ConfirmModalComponent, {data});
      dialog.closed.subscribe((result) => resolve(result));
    });
  }
}
