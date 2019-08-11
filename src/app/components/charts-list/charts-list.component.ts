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
  series = [];

  toDate: any;
  fromDate: any;

  maxDate: any;
  minDate: any;

  // Max and Min for chart xAxis
  maxTimestamp: number;
  minTimestamp: number;

  constructor(private clickHandlerService: ClickHandlerService) {}

  ngOnInit() {
    // Default empty chart
    this.addChart();
  }

  changeChartsList(chart) {
    this.charts = [...this.charts, chart];
  }

  addChart() {
    // Adding chart options for display new chart
    const newChartOptions = getDefaultChartOptions(this.options.length + 1);
    this.options = [...this.options, newChartOptions];

    // For Add Chart button from nav component
    this.clickHandlerService.emitClickEvent('add', this.options.length);

    this.updateChartsXAxis(); // Apply the selected date to a new chart
  }

  removeChart(chartOptions) {
    this.options = this.options.filter(
      ({ title }) => title.text !== chartOptions.title.text,
    );
    this.charts = this.charts.filter(
      ({ options }) => options.title.text !== chartOptions.title.text,
    );

    // For Add Chart button from nav component
    this.clickHandlerService.emitClickEvent('remove', this.options.length);

    this.updateChartsTitles();
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

  updateChartsTitles() {
    this.charts.forEach((chart, i) => {
      if (chart) {
        chart.ref.update({
          title: {
            text: `Chart №${i + 1}`,
          },
        });
      }
    });
  }

  calcDateRange(series) {
    this.series = [...this.series, series];

    const allSeriesData = this.series
      .map(({ data }) => data.map(item => item[0]))
      .flat(4)
      .sort((a, b) => a[0] - b[0]);

    this.minDate = new Date(allSeriesData[0] * 1000);
    this.maxDate = new Date(allSeriesData[allSeriesData.length - 1] * 1000);
  }
}
