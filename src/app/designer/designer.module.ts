import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  WorkflowDesignerObjectModalComponent
} from './modals/workflow-designer-object-modal/workflow-designer-object-modal.component';
import { WorkflowDesignerStandaloneComponent } from './components/workflow-designer-standalone/workflow-designer-standalone.component';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';
import { WorkflowDesignerJobsComponent } from './components/workflow-designer-jobs/workflow-designer-jobs.component';
import { WorkflowDesignerLogsComponent } from './components/workflow-designer-logs/workflow-designer-logs.component';
import { WorkflowDesignerSettingsComponent } from './components/workflow-designer-settings/workflow-designer-settings.component';
import { WorkflowDesignerNotificationsComponent } from './components/workflow-designer-notifications/workflow-designer-notifications.component';
import { WorkflowDesignerPlateComponent } from './components/workflow-designer-plate/workflow-designer-plate.component';



@NgModule({
  declarations: [
    WorkflowDesignerObjectModalComponent,
    WorkflowDesignerStandaloneComponent,
    WorkflowDesignerJobsComponent,
    WorkflowDesignerLogsComponent,
    WorkflowDesignerSettingsComponent,
    WorkflowDesignerNotificationsComponent,
    WorkflowDesignerPlateComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  exports: [ WorkflowDesignerStandaloneComponent ]
})
export class DesignerModule { }
