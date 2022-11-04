import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() disabled?: boolean = false;
  @Input() model: boolean = false;
  @Output() modelChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggle($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.disabled) { return; }
    this.model = !this.model;
    this.modelChange.emit(this.model);
  }
}
