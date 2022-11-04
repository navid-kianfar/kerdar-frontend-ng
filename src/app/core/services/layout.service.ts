import { Injectable } from '@angular/core';

const ThemeManager = (window as any).ThemeManager;

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  manager: any = ThemeManager;
  constructor() { }

  toggle() {
    this.manager.toggle();
  }
}
