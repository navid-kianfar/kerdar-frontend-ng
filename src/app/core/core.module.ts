import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingDialogComponent } from './components/landing-dialog/landing-dialog.component';



@NgModule({
    declarations: [
        LandingDialogComponent
    ],
    exports: [
        LandingDialogComponent
    ],
    imports: [
        CommonModule
    ]
})
export class CoreModule { }
