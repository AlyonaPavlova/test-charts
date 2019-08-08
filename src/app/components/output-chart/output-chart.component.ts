import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-output-chart',
  templateUrl: './output-chart.component.html',
  styleUrls: ['./output-chart.component.css'],
})
export class OutputChartComponent implements OnInit {
  @Input() chartOptions: any;

  @Output() newChartEvent = new EventEmitter<any>();

  stockChart: any;

  constructor() {}

  ngOnInit() {
    this.stockChart = new StockChart(this.chartOptions);
    this.newChartEvent.emit(this.stockChart);
  }
}
