import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './components/wizard/wizard.component';
import {FormsModule} from '@angular/forms';
import { WaitingComponent } from './components/waiting/waiting.component';



@NgModule({
    declarations: [
        WizardComponent,
        WaitingComponent
    ],
  exports: [
    WizardComponent,
    WaitingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
