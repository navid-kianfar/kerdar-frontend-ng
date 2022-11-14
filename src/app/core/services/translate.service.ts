import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LayoutService} from './layout.service';
import {StringHelpers} from '../helpers/string.helpers';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private readonly repository: any = null;

  constructor(
    readonly client: HttpClient,
    private readonly layoutService: LayoutService
  ) {
    this.repository = {};
    this.repository[this.layoutService.lang] = {};
  }

  async load(culture: string = '', path: string = ''): Promise<boolean> {
    culture = culture || this.layoutService.lang;
    path = path || `assets/i18n/${culture}.json?rand=${new Date().getTime()}`;
    return new Promise((resolve, reject) => {
      this.client.get(path).subscribe(
        (response: any) => {
          this.repository[culture] = response;
          resolve(true);
        },
        (err: Error) => {
          this.repository[culture] = {};
          reject(err);
        }
      );
    });
  }

  public formatted(key: string, params: any[]): string {
    const trans = this.fromKey(key);
    return StringHelpers.format(trans, params);
  }

  public fromKey(
    value: string,
    skipLog: boolean = false,
    fallback: string = ''
  ): string {
    value = value || '';
    let result = this.repository[this.layoutService.lang][value];
    if ((result === null || result === undefined) && fallback) {
      result = this.repository[this.layoutService.lang][fallback];
    }
    if ((result === null || result === undefined) && !skipLog) {
      // console.log('Translate not found : ', value);
    }
    return result || fallback || (value || '').toString().replace(/_/g, ' ');
  }
}
