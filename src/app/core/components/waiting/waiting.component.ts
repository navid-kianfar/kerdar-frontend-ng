import {Component, Input, OnInit} from '@angular/core';
import {WaitingLoaderInfo} from '../../types/shared-dtos';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.scss']
})
export class WaitingComponent implements OnInit {
  @Input() loader?: WaitingLoaderInfo;
  constructor() { }

  ngOnInit(): void {
  }

}
