import { Component, OnInit } from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import {
  WorkflowDesignerObjectModalComponent
} from '../modals/workflow-designer-object-modal/workflow-designer-object-modal.component';
import {WorkflowDesignerNodeModalResponse} from '../dtos/designer-dtos';

@Component({
  selector: 'app-workflow-designer',
  templateUrl: './workflow-designer.component.html',
  styleUrls: ['./workflow-designer.component.scss']
})
export class WorkflowDesignerComponent implements OnInit {
  waiting: boolean = false;

  constructor(public dialog: Dialog) { }

  ngOnInit(): void {
    this.waiting = true;
    setTimeout(() => this.waiting = false, 1000);
    this.setFakeData();
  }

  private setFakeData() {

  }

  addNode() {
    const dialogRef = this.dialog
      .open<WorkflowDesignerNodeModalResponse>(WorkflowDesignerObjectModalComponent, {
        data: {

        },
      });

    dialogRef.closed.subscribe(result => {

    });
  }
}
