import {Component, OnInit} from '@angular/core';
import {ActionViewModel} from '../../core/dtos/landing-dialog-dtos';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
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
    this.header = 'Welcome to Kerdar Workflow engine';
    this.searchPlaceHolder = 'Search applications';
    this.barActions = [
      {
        title: 'New Application',
        icon: 'ti ti-wand'
      },
      {
        title: 'Import Applications',
        icon: 'ti ti-packge-import'
      }
    ];
    this.sideActions = [
      {
        title: 'Applications',
        selected: true,
        subActions: [
          {
            selected: true,
            title: 'Market Place Application',
            subTitle: 'market place is a lead generation platform',
            url: '/app/123456790/workflows/wizard',
            icon: 'ti ti-stack-2',
            subActions: [
              {
                title: 'Delete Application',
                subTitle: 'All related workflows will be deleted',
                icon: 'ti ti-trash',
                execute: (self: ActionViewModel) => {
                  console.log('COMMAND: ', self.title);
                }
              },
              {
                title: 'Clone Application',
                subTitle: 'All related workflows will be cloned',
                icon: 'ti ti-copy',
                execute: (self: ActionViewModel) => {
                  console.log('COMMAND: ', self.title);
                }
              },
              {
                title: 'Archive Application',
                subTitle: 'All related workflows will be suspended',
                icon: 'ti ti-archive',
                execute: (self: ActionViewModel) => {
                  console.log('COMMAND: ', self.title);
                }
              }
            ]
          }
        ]
      },
      {
        title: 'Settings',
        subActions: [
          {
            title: 'Manage Account',
            subTitle: 'here you can manage your account',
            icon: 'ti ti-user-circle'
          },
          {
            title: 'Manage Subscriptions',
            subTitle: 'here you can manage your account',
            icon: 'ti ti-abacus'
          }
        ]
      },
      {
        title: 'Help',
        subActions: [
          {
            title: 'FAQ',
            subTitle: 'here you can find previously answered questions',
            icon: 'ti ti-help'
          },
          {
            title: 'Knowledge base - wiki',
            subTitle: 'here you can find all the documentations',
            icon: 'ti ti-notebook'
          }
        ]
      }
    ];
    this.mainActions = [];
  }

}
