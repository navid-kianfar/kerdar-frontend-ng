import {Component, Inject, Input, OnInit} from '@angular/core';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {
  WorkflowDesignerNodeModalRequest,
  WorkflowDesignerNodeModalResponse,
  WorkflowDesignerNodeSheet
} from '../../dtos/designer-dtos';
import {CommandViewModel} from '../../../core/dtos/shared-dtos';

@Component({
  selector: 'app-workflow-designer-object-modal',
  templateUrl: './workflow-designer-object-modal.component.html',
  styleUrls: ['./workflow-designer-object-modal.component.scss']
})
export class WorkflowDesignerObjectModalComponent implements OnInit {
  items: CommandViewModel[] = [];
  filterText: string = '';
  placeHolder: string = '';

  constructor(
    public dialogRef: DialogRef<WorkflowDesignerNodeModalResponse>,
    @Inject(DIALOG_DATA) public data: WorkflowDesignerNodeModalRequest) { }

  ngOnInit(): void {
    const first = this.data.sheets[0];
    this.switchSheet(first);
  }

  switchSheet(sheet: WorkflowDesignerNodeSheet) {
    this.data.sheets.forEach(sh => sh.selected = false);
    sheet.selected = true;
    sheet.items = sheet.items || [];
    this.placeHolder = sheet.placeHolder || 'Enter your query to filter items...';
    this.items = [...sheet.items];
    this.filterText = '';
  }

  pickItem(item: CommandViewModel) {
    this.dialogRef.close({
      item,
      sheet: this.data.sheets.find(sh => sh.selected)!
    });
  }
}
