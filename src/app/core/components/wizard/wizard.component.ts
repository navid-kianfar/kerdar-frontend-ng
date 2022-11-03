import {Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {CommandViewModel} from '../../dtos/shared-dtos';
import {Router} from '@angular/router';
import {filter, fromEvent, Subscription, take} from 'rxjs';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  @Input() searchPlaceHolder: string = '';
  @Input() header: string = '';
  @Input() showActionBar: boolean = true;
  @Input() showSidebar: boolean = true;
  @Input() showFilter: boolean = true;
  @Input() barActions: CommandViewModel[] = [];
  @Input() sideActions: CommandViewModel[] = [];
  @Input() mainActions: CommandViewModel[] = [];

  filterText: string = '';
  contextMenuSubscription?: Subscription;
  @ViewChild('contextMenu') actionContextMenu?: TemplateRef<any>;
  overlayRef?: OverlayRef | null;

  constructor(
    private readonly router: Router,
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    if (this.sideActions?.length) {
      const selected = this.sideActions.find(i => i.selected) || this.sideActions[0];
      this.pickSide(selected);
    }
  }

  pickSide(side: CommandViewModel) {
    this.sideActions.forEach(a => a.selected = false);
    side.selected = true;
    if (side.subActions && side.subActions.length) {
      this.mainActions = [...side.subActions];
    }
  }

  async pickMain(main: CommandViewModel) {
    this.mainActions.forEach(a => a.selected = false);
    main.selected = true;
    if (main.url) {
      await this.router.navigateByUrl(main.url);
    }
  }

  showSettings(main: CommandViewModel, $event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.showContextMenu($event, main.subActions || []);
  }

  showContextMenu({ x, y }: MouseEvent, actions: CommandViewModel[]) {
    this.closeContextMenu();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        }
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });

    this.overlayRef.attach(new TemplatePortal(this.actionContextMenu!, this.viewContainerRef, {
      $implicit: actions
    }));

    this.contextMenuSubscription = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.closeContextMenu())

  }

  closeContextMenu() {
    this.contextMenuSubscription && this.contextMenuSubscription.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  contextMenuAction(action: CommandViewModel, $event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.closeContextMenu();
    if (action.url) {
      this.router.navigateByUrl(action.url);
      return;
    }
    if (action.execute) {
      action.execute(action);
      return;
    }
    console.log('NO COMMAND FOR : ', action.title);
  }
}
