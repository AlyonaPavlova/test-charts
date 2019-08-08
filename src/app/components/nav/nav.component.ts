import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Output() addChartClickEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  onClickAddChart() {
    this.addChartClickEvent.emit();
  }
}
