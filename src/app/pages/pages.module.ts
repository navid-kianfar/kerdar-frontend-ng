import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import {CoreModule} from '../core/core.module';
import { WorkflowListsComponent } from './workflows/workflow-lists/workflow-lists.component';
import { WorkflowDesignerComponent } from './workflows/workflow-designer/workflow-designer.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    WorkflowListsComponent,
    WorkflowDesignerComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ]
})
export class PagesModule { }
