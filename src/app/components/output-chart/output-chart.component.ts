import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { StockChart } from 'angular-highcharts';

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

  onSensorSelected(selectedSensors) {
    if (selectedSensors.length) {
      this.stockChart.ref$.subscribe(res => {
        let newSeries;

        if (res.options.series.length) {
          let filteredSensors = [];

          res.options.series.forEach(({ name }) => {
            selectedSensors.forEach(sensor => {
              if (sensor.name !== name) {
                filteredSensors.push({ ...sensor, type: this.chartType });
              }
            });
          });

          const filteredSensorsWithType = filteredSensors.map(sensor => {
            return {
              ...sensor,
              type: this.chartType,
            };
          });

          newSeries = [...res.options.series, ...filteredSensorsWithType];
        } else {
          newSeries = selectedSensors.map(sensor => {
            return {
              ...sensor,
              type: this.chartType,
            };
          });
        }

        newSeries.forEach(serie => {
          res.addSeries(serie, true);
        });
      });
    }
  }
}
