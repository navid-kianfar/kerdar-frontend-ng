import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';

const ThemeManager = (window as any).ThemeManager;

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  manager: any = ThemeManager;
  lang: string = environment.lang;
  constructor() {
    // culture = localStorage.getItem(this.layoutService.LANG_STORAGE_KEY) || culture;
    // localStorage.setItem(this.layoutService.LANG_STORAGE_KEY, culture);
  }

  toggle() {
    this.manager.toggle();
  }
}
