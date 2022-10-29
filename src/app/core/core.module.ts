import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingDialogComponent } from './components/landing-dialog/landing-dialog.component';
import {FormsModule} from '@angular/forms';



@NgModule({
    declarations: [
        LandingDialogComponent
    ],
    exports: [
        LandingDialogComponent
    ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
