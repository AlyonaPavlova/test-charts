import { Component, OnInit } from '@angular/core';

import {
  getDefaultChartOptions,
  getNewChartOptions,
  defaultChartType,
  defaultLineColor,
} from '../../../environments/environment';
import { ClickHandlerService } from '../../services';
import { getSensorsNumber, setSensorsData } from '../../../utils';

@Component({
  selector: 'app-charts-list',
  templateUrl: './charts-list.component.html',
  styleUrls: ['./charts-list.component.css'],
})
export class ChartsListComponent implements OnInit {
  chartType = defaultChartType;
  lineColor = defaultLineColor;

  tmpSensorsData = [];
  humiditySensorsData = [];
  lightSensorsData = [];

  selectedTmpSensorsArr: any;

  charts = [];

  defaultChartOptions = getDefaultChartOptions(this.charts);
  options = [this.defaultChartOptions];

  constructor(private clickHandlerService: ClickHandlerService) {}

  ngOnInit() {
    setSensorsData(this.tmpSensorsData, getSensorsNumber());
    setSensorsData(this.humiditySensorsData, getSensorsNumber());
    setSensorsData(this.lightSensorsData, getSensorsNumber());
  }

  changeChartsList(chart) {
    this.charts = [...this.charts, chart];
  }

  // Adding chart options for display new chart
  addChart() {
    const newChartOptions = this.options.length
      ? getNewChartOptions(this.options.length + 1)
      : getDefaultChartOptions(this.charts);

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

    this.clickHandlerService.emitClickEvent('remove', this.options.length);
  }

  onChangeDataChart(chartOptions) {
    this.charts.forEach(chart => {
      if (chart.options.title.text === chartOptions.title.text) {
        chart.ref.update({
          chart: {
            type: this.chartType,
          },
          series: chart.options.series.map(item => {
            return { ...item, color: this.lineColor };
          }),
        });
      }
    });
  }

  onSelectSensors(chartOptions) {
    console.log(this.selectedTmpSensorsArr);
  }
}
