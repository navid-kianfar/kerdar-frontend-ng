import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {interval} from 'rxjs';
import {ModalService} from './modal.service';
import {NotificationService} from './notification.service';

@Injectable()
export class AppInitializerProvider {
  loaded: boolean;
  profileLoaded: boolean;
  assets = [
    '/assets/plugins/joint-js/jquery.min.js',
    '/assets/plugins/joint-js/lodash.min.js',
    '/assets/plugins/joint-js/backbone.js',
    '/assets/plugins/joint-js/joint.min.js'
  ];

  constructor(
    private readonly http: HttpClient,
    private readonly injector: Injector,
    public readonly swUpdate: SwUpdate
  ) {
    this.loaded = false;
    this.profileLoaded = false;
    this.bind();
  }

  bind(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    interval(1000 * 60 * 10).subscribe(() => {
      if (this.swUpdate.isEnabled) {
        this.swUpdate
          .checkForUpdate()
          .then(() => console.log('checking for updates...'));
      }
    });
    this.swUpdate.available.subscribe(async (event) => {
      this.injector
        .get<NotificationService>(NotificationService)
        .info('an application update is being downloaded...');

      await this.swUpdate.activateUpdate();

      const op = await this.injector.get<ModalService>(ModalService).confirm({
        title: 'title',
        subTitle: 'subTitle',
        description: 'description',
        icon: '',
        confirmLabel: 'Update and reload',
        cancelLabel: 'Later...'
      });

      if (op.confirmed) {
        window.location.reload();
      }
    });
    this.swUpdate.activated.subscribe((event) => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('PWA Application');
    }
    window.addEventListener('appinstalled', (evt) => {
      console.log('PWA Application installed');
    });
  }

  async assetLoader(path: string): Promise<void> {
    // @ts-ignore
    const loader = window.$script;
    return new Promise<void>((resolve) => {
      loader(path, () => resolve());
    });
  }

  async loadAssets(): Promise<void> {
    for (let i = 0; i < this.assets.length; i++) {
      await this.assetLoader(this.assets[i]);
    }
  }

  async load(): Promise<void> {
    // const promise1 = this.identityService.loadProfile();
    // const promise2 = this.translateService.load();
    // const promise3 = this.enumsService.load();
    const promise4 = this.loadAssets();

    // promise1.then((op) => {
    //   if (op.IsSuccess) {
    //     this.pushNotificationService.prepareDevice();
    //   }
    // });
    return Promise.all([/*promise1, promise2, promise3, */promise4])
      .catch(() => Promise.reject())
      .then(() => Promise.resolve());
  }
}

export function AppInitializerFactory(provider: AppInitializerProvider): any {
  return () =>
    provider.load().then(
      () => (provider.loaded = true),
      () => {
        console.log('INITIALIZE_FAILED');
        // window.location.reload();
      }
    );
}
