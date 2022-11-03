import { Component, OnInit } from '@angular/core';
import {CommandViewModel, WaitingLoaderInfo} from '../../../core/dtos/landing-dialog-dtos';

@Component({
  selector: 'app-workflow-wizard',
  templateUrl: './workflow-wizard.component.html',
  styleUrls: ['./workflow-wizard.component.scss']
})
export class WorkflowWizardComponent implements OnInit {
  searchPlaceHolder: string = '';
  header: string = '';
  waiting: boolean = false;
  barActions: CommandViewModel[] = [];
  sideActions: CommandViewModel[] = [];
  mainActions: CommandViewModel[] = [];
  waitingLoaderInfo: WaitingLoaderInfo = { title: '', current: '' };
  constructor() { }

  ngOnInit(): void {
    this.waiting = true;
    this.waitingLoaderInfo = {
      title: 'Please wait, the workflows are being downloaded',
      current: 'This is the current operation going on',
      indeterminate: true,
      percentage: 0,
      description: 'This is a dummy text to check the description'
    };
    setTimeout(() => this.waiting = false, 1000);
    this.setFakeData();
  }

  private setFakeData() {
    this.header = 'Create a workflow or continue with an existing one';
    this.searchPlaceHolder = 'Search workflows';
    this.barActions = [
      {
        title: 'New Workflow',
        icon: 'ti ti-wand'
      },
      {
        title: 'Import Workflows',
        icon: 'ti ti-packge-import'
      }
    ];
    this.sideActions = [
      {
        title: 'Workflows',
        selected: true,
        subActions: [
          {
            selected: true,
            title: 'On new message received',
            subTitle: 'Send a welcome message if user is messaging fot the first time',
            url: '/app/123456790/workflows/123456790/designer',
            icon: 'ti ti-arrows-split-2'
          },
          {
            title: 'On consultation completed',
            subTitle: 'Send a quote to user when treatment plan is generated',
            url: '/app/123456790/workflows/123456790/designer',
            icon: 'ti ti-arrows-split-2'
          },
        ]
      },
      {
        title: 'Templates',
        subActions: [
          {
            title: 'Template 1',
            subTitle: 'This is a description for the showing template',
            icon: 'ti ti-shape-2'
          },
          {
            title: 'Template 2',
            subTitle: 'This is a description for the showing template',
            icon: 'ti ti-shape-2'
          },
          {
            title: 'Template 3',
            subTitle: 'This is a description for the showing template',
            icon: 'ti ti-shape-2'
          },
        ]
      },
      {
        title: 'Help',
        subActions: [
          {
            title: 'What is workflow',
            subTitle: 'This is a description for the showing template',
            icon: 'ti ti-alert-triangle'
          },
          {
            title: 'Micro services and integrations',
            subTitle: 'How can micro services are integrated to workflow engine',
            icon: 'ti ti-plug-connected'
          }
        ]
      }
    ];
    this.mainActions = [];
  }
}
