import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingDialogComponent } from './components/landing-dialog/landing-dialog.component';
import {FormsModule} from '@angular/forms';
import { WaitingComponent } from './components/waiting/waiting.component';



@NgModule({
    declarations: [
        LandingDialogComponent,
        WaitingComponent
    ],
  exports: [
    LandingDialogComponent,
    WaitingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
