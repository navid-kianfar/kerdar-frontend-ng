import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import {CoreModule} from '../core/core.module';
import { WorkflowWizardComponent } from './workflows/workflow-lists/workflow-wizard.component';
import { WorkflowDesignerComponent } from './workflows/workflow-designer/workflow-designer.component';
import { WorkflowDesignerNodeModalComponent } from './workflows/modals/workflow-designer-node-modal/workflow-designer-node-modal.component';
import {DialogModule} from '@angular/cdk/dialog';

@NgModule({
  declarations: [
    WelcomeComponent,
    WorkflowWizardComponent,
    WorkflowDesignerComponent,
    WorkflowDesignerNodeModalComponent
  ],
  imports: [
    DialogModule,
    CommonModule,
    CoreModule
  ]
})
export class PagesModule { }
