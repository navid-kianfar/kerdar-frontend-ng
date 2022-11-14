import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from './translate.service';
import {StringDictionary} from '../types/dictionary';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly translate: TranslateService,
    private readonly snackBar: MatSnackBar
  ) {}

  clear(): void {
    this.snackBar.dismiss();
  }

  clean(input: string, replace: StringDictionary<string> = new StringDictionary<string>()): string {
    if (input) {
      input = this.translate.fromKey(input);
    }
    if (replace !== null) {
      replace.Keys().forEach((k) => {
        const value = replace.Item(k);
        k = k.replace('{', '\\{').replace('}', '\\}');
        input = input.replace(new RegExp(k, 'g'), value);
      });
    }
    return input;
  }

  error(
    message: string,
    replace: StringDictionary<string> = new StringDictionary<string>(),
    options: any = null
  ): void {
    message = message || 'GENERAL_ERROR';
    const params = { ...CONFIG, panelClass: 'error-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }

  info(
    message: string,
    replace: StringDictionary<string> = new StringDictionary<string>(),
    options: any = null
  ): void {
    const params = { ...CONFIG, panelClass: 'info-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }

  success(
    message: string,
    replace: StringDictionary<string> = new StringDictionary<string>(),
    options: any = null
  ): void {
    const params = { ...CONFIG, panelClass: 'success-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }

  warning(
    message: string,
    replace: StringDictionary<string> = new StringDictionary<string>(),
    options: any = null
  ): void {
    const params = { ...CONFIG, panelClass: 'warning-snack', ...options };
    this.snackBar.open(this.clean(message, replace), undefined, params);
  }
}

const CONFIG = {
  verticalPosition: 'top',
  horizontalPosition: 'center',
  duration: 5000,
};
