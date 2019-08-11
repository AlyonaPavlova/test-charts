import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { maxChartsNumber } from '../../../environments/environment';
import { ClickHandlerService } from '../../services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Output() addChartClickEvent = new EventEmitter<any>();

  chartsNumber: number;
  maxChartsNumber = maxChartsNumber;

  constructor(private clickHandlerService: ClickHandlerService) {}

  ngOnInit() {
    this.clickHandlerService.actions.subscribe(res => {
      if (res) {
        this.chartsNumber = res.payload;
      }
    });
  }

  onClickAddChart() {
    this.addChartClickEvent.emit();
  }
}
