import {Component, Inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {WorkflowDesignerNodeModalRequest, WorkflowDesignerNodeModalResponse} from '../../dtos/designer-dtos';

@Component({
  selector: 'app-workflow-designer-node-modal',
  templateUrl: './workflow-designer-node-modal.component.html',
  styleUrls: ['./workflow-designer-node-modal.component.scss']
})
export class WorkflowDesignerNodeModalComponent implements OnInit {

  constructor(
    public dialogRef: DialogRef<WorkflowDesignerNodeModalResponse>,
    @Inject(DIALOG_DATA) public data: WorkflowDesignerNodeModalRequest) { }

  ngOnInit(): void {
  }

}
