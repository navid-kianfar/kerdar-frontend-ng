import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  WorkflowDesignerObjectModalComponent
} from './modals/workflow-designer-object-modal/workflow-designer-object-modal.component';
import { WorkflowDesignerStandaloneComponent } from './components/workflow-designer-standalone/workflow-designer-standalone.component';



@NgModule({
  declarations: [
    WorkflowDesignerObjectModalComponent,
    WorkflowDesignerStandaloneComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ WorkflowDesignerStandaloneComponent ]
})
export class DesignerModule { }
