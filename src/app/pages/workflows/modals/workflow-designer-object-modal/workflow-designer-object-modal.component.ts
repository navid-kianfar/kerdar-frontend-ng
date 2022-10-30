import {Component, Inject, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {WorkflowDesignerNodeModalRequest, WorkflowDesignerNodeModalResponse} from '../../dtos/designer-dtos';

@Component({
  selector: 'app-workflow-designer-object-modal',
  templateUrl: './workflow-designer-object-modal.component.html',
  styleUrls: ['./workflow-designer-object-modal.component.scss']
})
export class WorkflowDesignerObjectModalComponent implements OnInit {

  constructor(
    public dialogRef: DialogRef<WorkflowDesignerNodeModalResponse>,
    @Inject(DIALOG_DATA) public data: WorkflowDesignerNodeModalRequest) { }

  ngOnInit(): void {
  }

}
