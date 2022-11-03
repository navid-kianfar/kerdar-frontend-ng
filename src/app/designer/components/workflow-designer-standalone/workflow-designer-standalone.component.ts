import { Component, OnInit } from '@angular/core';
import {Dialog} from '@angular/cdk/dialog';
import {WorkflowDesignerNodeModalRequest, WorkflowDesignerNodeModalResponse} from '../../dtos/designer-dtos';
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
          sheets: [
            {
              selected: true,
              title: 'Components',
              placeHolder: 'Search components...',
              icon: 'ti ti-puzzle',
              items: [
                {
                  selected: true,
                  title: 'Component title',
                  icon: 'ti ti-puzzle',
                  section: 'Omni Channel',
                  subTitle: 'this is a description to be shown for this title and it is going to be very very long text so it would fuck the ui i suppose? lets find out!',
                },
                {
                  title: 'Component title',
                  icon: 'ti ti-puzzle',
                  section: 'Omni Channel',
                },
                {
                  title: 'Component title',
                  icon: 'ti ti-puzzle',
                  section: 'Omni Channel',
                },
                {
                  title: 'Component title',
                  icon: 'ti ti-puzzle',
                  section: 'Omni Channel',
                },
                {
                  title: 'Component title',
                  icon: 'ti ti-puzzle',
                  section: 'Omni Channel',
                },
                {
                  title: 'Component title',
                  icon: 'ti ti-puzzle',
                  section: 'Omni Channel',
                },
                {
                  title: 'Component title',
                  icon: 'ti ti-puzzle',
                  section: 'Omni Channel',
                },
              ]
            },
            {
              title: 'Primitives',
              placeHolder: 'Search components...',
              icon: 'ti ti-cpu',
            },
            {
              title: 'Events',
              placeHolder: 'Search components...',
              icon: 'ti ti-activity',
            },
            {
              title: 'Workflows',
              placeHolder: 'Search components...',
              icon: 'ti ti-arrows-split-2',
            }
          ]
        } as WorkflowDesignerNodeModalRequest,
      });

    dialogRef.closed.subscribe(result => {
      console.log(result);
    });
  }
}
