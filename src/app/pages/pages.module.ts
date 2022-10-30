import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import {CoreModule} from '../core/core.module';
import { WorkflowWizardComponent } from './workflows/workflow-wizard/workflow-wizard.component';
import { WorkflowDesignerComponent } from './workflows/workflow-designer/workflow-designer.component';
import { WorkflowDesignerObjectModalComponent } from './workflows/modals/workflow-designer-object-modal/workflow-designer-object-modal.component';
import {DialogModule} from '@angular/cdk/dialog';

@NgModule({
  declarations: [
    WelcomeComponent,
    WorkflowWizardComponent,
    WorkflowDesignerComponent,
    WorkflowDesignerObjectModalComponent
  ],
  imports: [
    DialogModule,
    CommonModule,
    CoreModule
  ]
})
export class PagesModule { }
