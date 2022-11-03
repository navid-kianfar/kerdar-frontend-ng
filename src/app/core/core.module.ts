import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './components/wizard/wizard.component';
import {FormsModule} from '@angular/forms';
import { WaitingComponent } from './components/waiting/waiting.component';
import { FilterByPipe } from './pipes/filter-by.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
    declarations: [
        WizardComponent,
        WaitingComponent,
        FilterByPipe,
        ConfirmModalComponent
    ],
  exports: [
    WizardComponent,
    WaitingComponent,
    FilterByPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule
  ]
})
export class CoreModule { }
