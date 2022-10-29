import {Component, Input, OnInit} from '@angular/core';
import {ActionViewModel} from '../../dtos/landing-dialog-dtos';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-dialog',
  templateUrl: './landing-dialog.component.html',
  styleUrls: ['./landing-dialog.component.scss']
})
export class LandingDialogComponent implements OnInit {

  @Input() searchPlaceHolder: string = '';
  @Input() header: string = '';
  @Input() showActionBar: boolean = true;
  @Input() showSidebar: boolean = true;
  @Input() showFilter: boolean = true;
  @Input() barActions: ActionViewModel[] = [];
  @Input() sideActions: ActionViewModel[] = [];
  @Input() mainActions: ActionViewModel[] = [];
  filterText: string = '';

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  pickSide(side: ActionViewModel) {
    this.sideActions.forEach(a => a.selected = false);
    side.selected = true;
    if (side.subActions && side.subActions.length) {
      this.mainActions = [...side.subActions];
    }
  }

  async pickMain(main: ActionViewModel) {
    this.mainActions.forEach(a => a.selected = false);
    main.selected = true;
    if (main.url) {
      await this.router.navigateByUrl(main.url);
    }
  }
}
