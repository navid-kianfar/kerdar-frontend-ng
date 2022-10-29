import { Component, OnInit } from '@angular/core';
import {ActionViewModel} from '../../../core/dtos/landing-dialog-dtos';

@Component({
  selector: 'app-workflow-lists',
  templateUrl: './workflow-lists.component.html',
  styleUrls: ['./workflow-lists.component.scss']
})
export class WorkflowListsComponent implements OnInit {
  searchPlaceHolder: string = '';
  header: string = '';
  waiting: boolean = false;
  barActions: ActionViewModel[] = [];
  sideActions: ActionViewModel[] = [];
  mainActions: ActionViewModel[] = [];
  constructor() { }

  ngOnInit(): void {
    this.waiting = true;
    setTimeout(() => this.waiting = false, 1000);
    this.setFakeData();
  }

  private setFakeData() {
    this.header = 'Choose or create a workflow to continue with';
    this.searchPlaceHolder = 'Search workflows';
    this.barActions = [
      {
        title: 'New Workflow',
        icon: 'krdr-icon-magic-wand'
      },
      {
        title: 'Import Workflows',
        icon: 'krdr-icon-download10'
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
            icon: 'krdr-icon-git-branch'
          },
          {
            title: 'On consultation completed',
            subTitle: 'Send a quote to user when treatment plan is generated',
            url: '/app/123456790/workflows/123456790/designer',
            icon: 'krdr-icon-git-branch'
          },
        ]
      },
      {
        title: 'Templates',
        subActions: [
          {
            title: 'Template 1',
            subTitle: 'This is a description for the showing template',
            icon: 'krdr-icon-codesandbox'
          },
          {
            title: 'Template 2',
            subTitle: 'This is a description for the showing template',
            icon: 'krdr-icon-briefcase'
          },
          {
            title: 'Template 3',
            subTitle: 'This is a description for the showing template',
            icon: 'krdr-icon-box'
          },
        ]
      },
      {
        title: 'Help',
      }
    ];
    this.mainActions = [
      {
        selected: true,
        title: 'On new message received',
        subTitle: 'Send a welcome message if user is messaging fot the first time',
        url: '/app/123456790/workflows/123456790/designer',
        icon: 'krdr-icon-git-branch'
      },
      {
        title: 'On consultation completed',
        subTitle: 'Send a quote to user when treatment plan is generated',
        url: '/app/123456790/workflows/123456790/designer',
        icon: 'krdr-icon-git-branch'
      },
    ];
  }
}
