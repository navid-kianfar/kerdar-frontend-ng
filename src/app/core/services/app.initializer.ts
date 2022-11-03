import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Injectable()
export class AppInitializerProvider {
  loaded: boolean;
  profileLoaded: boolean;
  assets = [];

  constructor(
    private readonly http: HttpClient,
    private readonly injector: Injector,
    public readonly swUpdate: SwUpdate
  ) {
    this.loaded = false;
    this.profileLoaded = false;
    // this.bind();
  }

  // bind(): void {
  //   if (!this.swUpdate.isEnabled) {
  //     return;
  //   }
  //
  //   interval(1000 * 60 * 10).subscribe(() => {
  //     if (this.swUpdate.isEnabled) {
  //       this.swUpdate
  //         .checkForUpdate()
  //         .then(() => console.log('checking for updates...'));
  //     }
  //   });
  //   this.swUpdate.available.subscribe(async (event) => {
  //     this.injector
  //       .get<NotificationService>(NotificationService)
  //       .info('APPLICATION_IS_UPDATING');
  //
  //     await this.swUpdate.activateUpdate();
  //
  //     this.injector.get<ModalService>(ModalService).confirm({
  //       actionLabel: 'RELOAD',
  //       cancelLabel: 'LATER',
  //       title: 'UPDATE_DOWNLOADED',
  //       heading: 'UPDATE_NOW_HEADING',
  //       action: async () => {
  //         setTimeout(() => document.location.reload(), 1000);
  //       },
  //     });
  //   });
  //   this.swUpdate.activated.subscribe((event) => {
  //     console.log('old version was', event.previous);
  //     console.log('new version is', event.current);
  //   });
  //   if (window.matchMedia('(display-mode: standalone)').matches) {
  //     console.log('PWA Application');
  //     this.identityService.install();
  //   }
  //   window.addEventListener('appinstalled', (evt) => {
  //     console.log('PWA Application installed');
  //     this.identityService.install();
  //   });
  // }

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
    return Promise.resolve();
    // const promise1 = this.identityService.loadProfile();
    // const promise2 = this.translateService.load();
    // const promise3 = this.enumsService.load();
    // const promise4 = this.loadAssets();
    //
    // promise1.then((op) => {
    //   if (op.IsSuccess) {
    //     this.pushNotificationService.prepareDevice();
    //   }
    // });
    // return Promise.all([promise1, promise2, promise3, promise4])
    //   .catch(() => Promise.reject())
    //   .then(() => Promise.resolve());
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
