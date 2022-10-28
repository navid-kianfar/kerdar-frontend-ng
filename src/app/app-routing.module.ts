import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagesModule} from './pages/pages.module';
import {WelcomeComponent} from './pages/welcome/welcome.component';

const routes: Routes = [
  {
    path: 'welcome',
    title: 'welcome',
    component: WelcomeComponent,
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
