import { Component, OnInit } from '@angular/core';
import {WorkflowDesignerNodeModalRequest, WorkflowDesignerNodeModalResponse} from '../../dtos/designer-dtos';
import {
  WorkflowDesignerObjectModalComponent
} from '../../modals/workflow-designer-object-modal/workflow-designer-object-modal.component';
import {ModalService} from '../../../core/services/modal.service';
import {ConfirmModalRequest, ConfirmModalResponse} from '../../../core/types/shared-dtos';
import {ConfirmModalComponent} from '../../../core/modals/confirm-modal/confirm-modal.component';
import {WorkflowSavePolicy} from '../../../core/types/enums';

@Component({
  selector: 'app-workflow-designer-standalone',
  templateUrl: './workflow-designer-standalone.component.html',
  styleUrls: ['./workflow-designer-standalone.component.scss']
})
export class WorkflowDesignerStandaloneComponent implements OnInit {
  waiting: boolean = false;

  constructor(
    private readonly modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.waiting = true;
    setTimeout(() => this.waiting = false, 1000);
    this.setFakeData();
  }

  private setFakeData() {

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
          items: []
        },
        {
          title: 'Events',
          placeHolder: 'Search components...',
          icon: 'ti ti-activity',
          items: []
        },
        {
          title: 'Workflows',
          placeHolder: 'Search components...',
          icon: 'ti ti-arrows-split-2',
          items: []
        }
      ]
    };
    const result = await this.modalService.show<
      WorkflowDesignerNodeModalRequest,
      WorkflowDesignerNodeModalResponse
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
          title: 'Apply only to new requests',
          subTitle: 'The pending jobs will continue with previous definition, new requests will pick up new definition',
          icon: 'ti ti-ease-in-out-control-points',
          value: WorkflowSavePolicy.OnlyNewRequest
        },
        {
          title: 'Pause and re-new existing flow',
          subTitle: 'The pending jobs will stop and will be picked up with the new definition',
          icon: 'ti ti-traffic-cone',
          value: WorkflowSavePolicy.Immediately
        },
        {
          title: 'Do not affect',
          subTitle: 'Save the draft of new definition but do not interrupt the current flow',
          icon: 'ti ti-road',
          value: WorkflowSavePolicy.DoNotAffect
        }
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
}
