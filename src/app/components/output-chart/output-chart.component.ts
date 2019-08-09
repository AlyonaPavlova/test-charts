import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { StockChart } from 'angular-highcharts';
import * as R from 'ramda';

import {
  defaultChartType,
  defaultLineColor,
  sensors,
} from '../../../environments/environment';
import { getSensorsData } from '../../../utils';

@Component({
  selector: 'app-output-chart',
  templateUrl: './output-chart.component.html',
  styleUrls: ['./output-chart.component.css'],
})
export class OutputChartComponent implements OnInit {
  sensorsByTypeList = sensors;
  chartType = defaultChartType;
  lineColor = defaultLineColor;

  @Input() chartOptions: any;

  @Output() newChartEvent = new EventEmitter<any>();

  stockChart: any;

  constructor() {}

  ngOnInit() {
    this.stockChart = new StockChart(this.chartOptions);
    this.newChartEvent.emit(this.stockChart);

    this.sensorsByTypeList = this.sensorsByTypeList.map(sensorsTypeObj => {
      return { ...sensorsTypeObj, sensors: getSensorsData() };
    });

    console.log('<<<<<<< Generated data: ', this.sensorsByTypeList);
  }

  onChangeChartProperty() {
    this.stockChart.ref.update({
      series: this.stockChart.options.series.map(item => {
        return { ...item, color: this.lineColor, type: this.chartType };
      }),
    });
  }

  onSensorSelected(chart) {
    this.stockChart.ref$.subscribe(res => {
      const isExistChart = R.includes(
        chart.name,
        res.series.map(({ name }) => name),
      );

      if (!isExistChart) {
        const newChart = { ...chart, type: this.chartType };

        res.addSeries(newChart, true);
      }
    });
  }

  onSensorRemoved(chart) {
    this.stockChart.ref$.subscribe(({ series }) => {
      series.find(({ name }) => chart.label === name).remove(true);
    });
  }

  onAllSensorsRemoved() {
    this.stockChart.ref$.subscribe(({ series }) => {
      while (series.length > 0) {
        series[0].remove(true);
      }
    });
  }
}
