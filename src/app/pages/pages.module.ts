import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import {CoreModule} from '../core/core.module';
import { WorkflowWizardComponent } from './workflows/workflow-wizard/workflow-wizard.component';
import { WorkflowDesignerComponent } from './workflows/workflow-designer/workflow-designer.component';
import {DialogModule} from '@angular/cdk/dialog';
import {DesignerModule} from '../designer/designer.module';

@NgModule({
  declarations: [
    WelcomeComponent,
    WorkflowWizardComponent,
    WorkflowDesignerComponent,
  ],
  imports: [
    DialogModule,
    CommonModule,
    CoreModule,
    DesignerModule
  ]
})
export class PagesModule { }
