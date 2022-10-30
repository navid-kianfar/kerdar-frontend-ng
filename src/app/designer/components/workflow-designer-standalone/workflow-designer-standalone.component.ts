import { Component, OnInit } from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import {WorkflowDesignerNodeModalResponse} from '../../dtos/designer-dtos';
import {
  WorkflowDesignerObjectModalComponent
} from '../../modals/workflow-designer-object-modal/workflow-designer-object-modal.component';

@Component({
  selector: 'app-workflow-designer-standalone',
  templateUrl: './workflow-designer-standalone.component.html',
  styleUrls: ['./workflow-designer-standalone.component.scss']
})
export class WorkflowDesignerStandaloneComponent implements OnInit {
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
