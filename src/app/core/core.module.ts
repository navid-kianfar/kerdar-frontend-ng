import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WizardComponent} from './components/wizard/wizard.component';
import {FormsModule} from '@angular/forms';
import {WaitingComponent} from './components/waiting/waiting.component';
import {FilterByPipe} from './pipes/filter-by.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ConfirmModalComponent} from './modals/confirm-modal/confirm-modal.component';
import {AppInitializerFactory, AppInitializerProvider} from './services/app.initializer';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptor} from './services/http.interceptor';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioButtonComponent } from './components/radio-button/radio-button.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    WizardComponent,
    WaitingComponent,
    FilterByPipe,
    ConfirmModalComponent,
    CheckboxComponent,
    RadioButtonComponent,
  ],
  exports: [
    WizardComponent,
    WaitingComponent,
    FilterByPipe,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatSnackBarModule ,
    MatProgressBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [AppInitializerProvider],
      multi: true,
    },
    AppInitializerProvider,
  ]
})
export class CoreModule {
}
