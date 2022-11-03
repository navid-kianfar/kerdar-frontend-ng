import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  WorkflowDesignerObjectModalComponent
} from './modals/workflow-designer-object-modal/workflow-designer-object-modal.component';
import { WorkflowDesignerStandaloneComponent } from './components/workflow-designer-standalone/workflow-designer-standalone.component';
import {CoreModule} from '../core/core.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    WorkflowDesignerObjectModalComponent,
    WorkflowDesignerStandaloneComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  exports: [ WorkflowDesignerStandaloneComponent ]
})
export class DesignerModule { }
