import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { maxChartsNumber } from '../../../environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Output() addChartClickEvent = new EventEmitter<any>();

  chartsNumber: number;
  maxChartsNumber = maxChartsNumber;

  constructor() {}

  ngOnInit() {}

  onClickAddChart() {
    this.addChartClickEvent.emit();

    this.chartsNumber = Number(localStorage.getItem('chartsNumber'));
  }
}
