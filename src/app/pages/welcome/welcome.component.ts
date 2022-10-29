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
        icon: 'krdr-icon-magic-wand'
      },
      {
        title: 'Import Applications',
        icon: 'krdr-icon-download10'
      }
    ];
    this.sideActions = [
      {
        title: 'Applications',
        selected: true
      },
      {
        title: 'Settings',
      },
      {
        title: 'Help',
      }
    ];
    this.mainActions = [
      {
        selected: true,
        title: 'Market Place Application',
        subTitle: 'market place is a lead generation platform',
        url: '/app/123456790/workflows',
        icon: 'krdr-icon-stack2'
      }
    ];
  }

}
