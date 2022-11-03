import { Component } from '@angular/core';
import {AppInitializerProvider} from './core/services/app.initializer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    readonly appInitializerProvider: AppInitializerProvider,
  ) {
    const loader = document.getElementById('app-loader')!;
    document.body.removeChild(loader);
  }
}
