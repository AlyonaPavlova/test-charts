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

  // Date range
  maxDate: Date;
  minDate: Date;

  // Max and Min for chart xAxis
  maxTimestamp: number;
  minTimestamp: number;

  constructor(private clickHandlerService: ClickHandlerService) {}

  ngOnInit() {
    this.clickHandlerService.actions.subscribe(res => {
      if (res) {
        if (res.action === 'addChart') {
          this.addChart(res.payload.chartName, res.payload.sensors);
        }
        if (res.action === 'editChart') {
          this.updateChart(
            res.payload.chartName,
            res.payload.newChartName,
            res.payload.sensors,
          );
        }
      }
    });
  }

  changeChartsList(chart) {
    this.charts = [...this.charts, chart];
  }

  addChart(chartName, sensors) {
    // Adding chart options for display new chart
    const newChartOptions = getDefaultChartOptions(chartName, sensors);
    this.options = [...this.options, newChartOptions];

    // For Add Chart button from nav-bar component
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

    // For Add Chart button from nav-bar component
    this.clickHandlerService.emitClickEvent('remove', this.options.length);
  }

  updateChart(chartName, newChartName, sensors) {
    this.charts.forEach(chart => {
      if (chart.options.title.text === chartName) {
        sensors.forEach(sensor => {
          if (
            !chart.options.series.map(({ name }) => name).includes(sensor.name)
          ) {
            chart.ref.addSeries(sensor);
          }
        });
      }
    });
  }

  updateChartsXAxis() {
    this.charts.forEach(chart => {
      if (chart) {
        chart.ref.xAxis[0].setExtremes(this.minTimestamp, this.maxTimestamp);
      }
    });
  }

  // For date picker
  onDateChange(event) {
    const { fromDate, toDate } = event;

    this.minTimestamp = fromDate
      ? formatDateToTimestamp(new Date(fromDate))
      : null;
    this.maxTimestamp = toDate ? formatDateToTimestamp(new Date(toDate)) : null;

    this.updateChartsXAxis();
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
