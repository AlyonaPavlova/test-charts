import { Component, OnInit } from '@angular/core';

import { getDefaultChartOptions } from '../../../environments/environment';
import { ClickHandlerService } from '../../services';
import { formatDateToTimestamp } from '../../../utils';

@Component({
  selector: 'app-charts-list',
  templateUrl: './charts-list.component.html',
  styleUrls: ['./charts-list.component.css'],
})
export class ChartsListComponent implements OnInit {
  charts = [];
  options = [];

  toDate: any;
  fromDate: any;

  maxTimestamp: number;
  minTimestamp: number;

  constructor(private clickHandlerService: ClickHandlerService) {}

  ngOnInit() {
    this.toDate = new Date();
    this.fromDate = new Date(2010, 1, 1);

    this.maxTimestamp = formatDateToTimestamp(this.toDate);
    this.minTimestamp = formatDateToTimestamp(this.fromDate);

    // Default empty chart
    this.addChart();
  }

  changeChartsList(chart) {
    this.charts = [...this.charts, chart];
  }

  // Adding chart options for display new chart
  addChart() {
    const newChartOptions = getDefaultChartOptions(this.options.length + 1);

    this.options = [...this.options, newChartOptions];

    this.clickHandlerService.emitClickEvent('add', this.options.length);
  }

  removeChart(chartOptions) {
    this.options = this.options.filter(
      ({ title }) => title.text !== chartOptions.title.text,
    );
    this.charts = this.charts.filter(
      ({ options }) => options.title.text !== chartOptions.title.text,
    );

    // if (chartOptions.title.text === 'Chart №1') {}

    this.clickHandlerService.emitClickEvent('remove', this.options.length);
  }

  onToDateChange(date) {
    this.maxTimestamp = formatDateToTimestamp(new Date(date));

    this.updateChartsXAxis();
  }

  onFromDateChange(date) {
    this.minTimestamp = formatDateToTimestamp(new Date(date));

    this.updateChartsXAxis();
  }

  updateChartsXAxis() {
    this.charts.forEach(chart => {
      if (chart) {
        chart.ref.xAxis[0].setExtremes(this.minTimestamp, this.maxTimestamp);
      }
    });
  }
}
