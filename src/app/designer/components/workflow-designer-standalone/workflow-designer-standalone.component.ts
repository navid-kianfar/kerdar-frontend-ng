import { Component, OnInit } from '@angular/core';
import {WorkflowDesignerObjectModalRequest, WorkflowDesignerObjectModalResponse} from '../../dtos/designer-dtos';
import {
  WorkflowDesignerObjectModalComponent
} from '../../modals/workflow-designer-object-modal/workflow-designer-object-modal.component';
import {ModalService} from '../../../core/services/modal.service';
import {CommandViewModel, ConfirmModalRequest, ConfirmModalResponse} from '../../../core/types/shared-dtos';
import {ConfirmModalComponent} from '../../../core/modals/confirm-modal/confirm-modal.component';
import {WorkflowSavePolicy} from '../../../core/types/enums';
import {WorkflowDesignerPlateComponent} from '../workflow-designer-plate/workflow-designer-plate.component';
import {WorkflowDesignerSettingsComponent} from '../workflow-designer-settings/workflow-designer-settings.component';
import {WorkflowDesignerLogsComponent} from '../workflow-designer-logs/workflow-designer-logs.component';
import {
  WorkflowDesignerNotificationsComponent
} from '../workflow-designer-notifications/workflow-designer-notifications.component';
import {WorkflowDesignerJobsComponent} from '../workflow-designer-jobs/workflow-designer-jobs.component';
import {LayoutService} from '../../../core/services/layout.service';

@Component({
  selector: 'app-workflow-designer-standalone',
  templateUrl: './workflow-designer-standalone.component.html',
  styleUrls: ['./workflow-designer-standalone.component.scss']
})
export class WorkflowDesignerStandaloneComponent implements OnInit {
  waiting: boolean = false;
  tabs: CommandViewModel[] = [];
  availableTabs: CommandViewModel[] = [];
  selectedTab?: CommandViewModel;

  constructor(
    private readonly modalService: ModalService,
    readonly layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.waiting = true;
    this.tabs = [
      {
        title: 'Designer',
        icon: 'ti ti-drag-drop',
        selected: true,
        dismissible: false,
        payload: WorkflowDesignerPlateComponent
      },
    ];
    this.availableTabs = [
      {
        id: 'jobs',
        title: 'Jobs',
        icon: 'ti ti-activity',
        dismissible: true,
        payload: WorkflowDesignerJobsComponent,
      },
      {
        id: 'notifications',
        title: 'Notifications',
        icon: 'ti ti-bell',
        dismissible: true,
        payload: WorkflowDesignerNotificationsComponent,
      },
      {
        id: 'logs',
        title: 'Logs',
        icon: 'ti ti-terminal-2',
        dismissible: true,
        payload: WorkflowDesignerLogsComponent,
      },
      {
        id: 'settings',
        title: 'Settings',
        icon: 'ti ti-settings',
        dismissible: true,
        payload: WorkflowDesignerSettingsComponent,
      },
    ]
    setTimeout(() => this.waiting = false, 1000);
    this.switchTab(this.tabs[0]);
    this.setFakeData();
  }

  private setFakeData() {

  }

  openTab(tabId: string) {
    let found = this.tabs.find(t => t.id === tabId);
    if (found) {
      // already injected, switch to tab
      this.switchTab(found);
      return;
    }
    found = this.availableTabs.find(t => t.id === tabId)!;
    this.tabs.push(found);
    this.switchTab(found);
  }

  async workflowPicker($event: MouseEvent) {
    this.cancelEvent($event);
    const data = {
      hideTabs: true,
      sheets: [
        {
          selected: true,
          title: 'Workflows',
          placeHolder: 'Search workflows...',
          icon: 'ti ti-arrows-split-2',
          items: [
            {
              title: 'On message received',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
            {
              title: 'Airport pickups',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
            {
              title: 'Accounting bills',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
            {
              title: 'Component title',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
            {
              title: 'Component title',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
            {
              title: 'Component title',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
            {
              title: 'Component title',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
          ]
        },
      ]
    };
    const result = await this.modalService.show<
      WorkflowDesignerObjectModalRequest,
      WorkflowDesignerObjectModalResponse
      >(WorkflowDesignerObjectModalComponent, data);

    console.log(result);
  }

  async addNode() {
    const data = {
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
          items: [
            {
              title: 'If',
              icon: 'ti ti-question-mark',
              section: 'Conditions',
            },
            {
              title: 'For',
              icon: 'ti ti-curly-loop',
              section: 'Conditions',
            },
            {
              title: 'While',
              icon: 'ti ti-curly-loop',
              section: 'Conditions',
            },
          ]
        },
        {
          title: 'Events',
          placeHolder: 'Search components...',
          icon: 'ti ti-activity',
          items: [
            {
              title: 'On message received',
              icon: 'ti ti-activity',
              section: 'Omni Channel',
            }
          ]
        },
        {
          title: 'Workflows',
          placeHolder: 'Search components...',
          icon: 'ti ti-arrows-split-2',
          items: [
            {
              title: 'Premium calculation',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
            {
              title: 'Airport pickups',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
            {
              title: 'Accounting bills',
              icon: 'ti ti-arrows-split-2',
              section: 'Market Place',
            },
          ]
        }
      ]
    };
    const result = await this.modalService.show<
      WorkflowDesignerObjectModalRequest,
      WorkflowDesignerObjectModalResponse
    >(WorkflowDesignerObjectModalComponent, data);

    console.log(result);
  }

  async saveWorkflow($event: MouseEvent) {
    this.cancelEvent($event);
    const result = await this.modalService.show<ConfirmModalRequest, ConfirmModalResponse>(ConfirmModalComponent, {
      title: 'Attention! Are you sure?',
      subTitle: 'Your changes may break flow of current or related workflows!',
      icon: 'ti ti-alert-circle',
      description: 'If you are not sure what you are doing, please DO NOT PROCEED',
      confirmLabel: 'Save changes',
      options: [
        {
          title: 'Do not affect',
          subTitle: 'Save the draft of new definition but do not interrupt the current flow',
          icon: 'ti ti-road',
          value: WorkflowSavePolicy.DoNotAffect
        },
        {
          title: 'Apply only to new requests',
          subTitle: 'The pending jobs will continue with previous definition, new requests will pick up new definition',
          icon: 'ti ti-ease-in-out-control-points',
          value: WorkflowSavePolicy.OnlyNewRequest
        },
        {
          title: 'Stop pending requests and use new definition',
          subTitle: 'The pending jobs will stop and will be picked up with the new definition',
          icon: 'ti ti-traffic-cone',
          value: WorkflowSavePolicy.Immediately
        },
      ]
    });
    console.log(result);
    if (result?.confirmed) {

    }
  }

  rearrangeLayout($event: MouseEvent) {
    this.cancelEvent($event);
  }

  async resetWorkflow($event: MouseEvent) {
    this.cancelEvent($event);
    const result = await this.modalService.show<ConfirmModalRequest, ConfirmModalResponse>(ConfirmModalComponent, {
      title: 'Are you sure?',
      subTitle: 'All your changes will be lost!',
      icon: 'ti ti-alert-triangle',
      agreement: 'I understand, please proceed',
      agreementRequired: true,
      description: 'some kind of additional data can be shown here to describe the situation better, some kind of additional data can be shown here to describe the situation better',
      confirmLabel: 'Revert all the changes'
    });
    console.log(result);
    if (result?.confirmed) {

    }
  }

  private cancelEvent($event: Event){
    $event.preventDefault();
    $event.stopPropagation();
  }

  closeTab(tab: CommandViewModel, $event: MouseEvent) {
    this.cancelEvent($event);
    this.tabs = this.tabs.filter(t => t !== tab);
    this.availableTabs.push(tab);
    if (tab.selected) {
      this.switchTab(this.tabs[0]);
    }
  }
  switchTab(tab: CommandViewModel, $event?: MouseEvent) {
    if ($event) {
      this.cancelEvent($event);
    }
    if (this.selectedTab) {
      this.selectedTab.selected = false;
    }
    this.selectedTab = tab;
    this.selectedTab.selected = true;
  }

}
