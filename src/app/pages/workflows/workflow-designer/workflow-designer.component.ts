import { Component, OnInit } from '@angular/core';
import {WaitingLoaderInfo} from '../../../core/dtos/shared-dtos';

@Component({
  selector: 'app-workflow-designer',
  templateUrl: './workflow-designer.component.html',
  styleUrls: ['./workflow-designer.component.scss']
})
export class WorkflowDesignerComponent implements OnInit {
  waiting: boolean = false;
  waitingLoaderInfo: WaitingLoaderInfo = { title: '', current: '' };

  constructor() { }

  ngOnInit(): void {
    this.waiting = true;
    this.waitingLoaderInfo = {
      title: 'Please wait, Workflow and related components are being loaded',
      current: 'Loading contact module',
      indeterminate: true,
      percentage: 0,
      description: '32 components, 13 events'
    };
    setTimeout(() => this.waiting = false, 10000);
  }
}
