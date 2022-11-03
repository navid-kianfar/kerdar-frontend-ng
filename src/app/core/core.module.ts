import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardComponent } from './components/wizard/wizard.component';
import {FormsModule} from '@angular/forms';
import { WaitingComponent } from './components/waiting/waiting.component';
import { FilterByPipe } from './pipes/filter-by.pipe';

@NgModule({
    declarations: [
        WizardComponent,
        WaitingComponent,
        FilterByPipe
    ],
  exports: [
    WizardComponent,
    WaitingComponent,
    FilterByPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
