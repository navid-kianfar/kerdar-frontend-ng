import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagesModule} from './pages/pages.module';
import {WelcomeComponent} from './pages/welcome/welcome.component';
import {WorkflowWizardComponent} from './pages/workflows/workflow-lists/workflow-wizard.component';
import {WorkflowDesignerComponent} from './pages/workflows/workflow-designer/workflow-designer.component';

const routes: Routes = [
  {
    path: 'welcome',
    title: 'welcome',
    component: WelcomeComponent,
    canActivate: []
  },
  {
    path: 'app/:app_id/workflows/wizard',
    title: 'workflows',
    component: WorkflowWizardComponent,
    canActivate: []
  },
  {
    path: 'app/:app_id/workflows/:workflow_id/designer',
    title: 'workflow designer',
    component: WorkflowDesignerComponent,
    canActivate: []
  },
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
