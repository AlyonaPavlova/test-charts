import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';

import { StockChart } from 'angular-highcharts';
import * as R from 'ramda';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { chartsTypes, sensors } from '../../../environments/environment';
import { getSensorsData } from '../../../utils';

@Component({
  selector: 'app-output-chart',
  templateUrl: './output-chart.component.html',
  styleUrls: ['./output-chart.component.css'],
})
export class OutputChartComponent implements OnInit, OnDestroy {
  sensorsByTypeList = sensors;
  chartsTypes = chartsTypes;

  @Input() chartOptions: any;

  @Output() newChartEvent = new EventEmitter<any>();
  @Output() newSeriesEvent = new EventEmitter<any>();

  stockChart: any;
  isApproximate: boolean;

  constructor() {}

  ngOnInit() {
    this.stockChart = new StockChart(this.chartOptions);
    this.newChartEvent.emit(this.stockChart);

    this.sensorsByTypeList = this.sensorsByTypeList.map(sensorsTypeObj => {
      return {
        ...sensorsTypeObj,
        sensors: getSensorsData(sensorsTypeObj.type),
      };
    });

    console.log('<<<<<<< Generated data: ', this.sensorsByTypeList);
  }

  onChangeChartProperty(sensorsType, property, value) {
    const sensorsByTypeNames = this.sensorsByTypeList
      .find(({ type }) => type === sensorsType)
      .sensors.map(({ name }) => name);

    this.stockChart.ref$.subscribe(({ series }) => {
      series.forEach(({ name }, i) => {
        if (R.includes(name, sensorsByTypeNames) || name === sensorsType) {
          series[i].update({
            [property]: value,
          });
        }
      });
    });
  }

  onSensorSelected(sensor, chartType) {
    this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(chart => {
      const isExistSensor = R.includes(
        sensor.name,
        chart.series.map(({ name }) => name),
      );

      if (!isExistSensor) {
        const newSeries = { ...sensor, type: chartType };

        // For calculate date range
        this.newSeriesEvent.emit(newSeries);

        chart.addSeries(newSeries, true);
      }
    });
  }

  onSensorRemoved(sensor, sensorsByTypeObj) {
    this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(({ series }) => {
      if (sensorsByTypeObj.isApproximate) {

        // Remove approximate series
        series.find(({ name }) => sensorsByTypeObj.type === name).remove();

        if (sensorsByTypeObj.selectedSensors.length === 1) {
          sensorsByTypeObj.isApproximate = false;

          // Display series without approximation
          this.onSensorSelected(
            sensorsByTypeObj.selectedSensors[0],
            sensorsByTypeObj.chartType,
          );
        } else {
          // Approximate with new series arr
          this.switchApproximate(sensorsByTypeObj);
        }
      } else {
        series.find(({ name }) => sensor.label === name).remove();
      }
    });
  }

  onAllSensorsRemovedByType(sensorsType, isCleared?) {
    if (isCleared) {
      this.changeSensorsByTypeToDefault(sensorsType);
    }

    const sensorsByTypeNames = this.sensorsByTypeList
      .find(({ type }) => type === sensorsType)
      .sensors.map(({ name }) => name);

    this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(({ series }) => {
      series
        .filter(
          ({ name }) =>
            sensorsByTypeNames.includes(name) || name === sensorsType,
        )
        .map(index => index.remove());
    });
  }

  changeSensorsByTypeToDefault(sensorsType) {
    this.sensorsByTypeList = this.sensorsByTypeList.map(sensorsByTypeObj =>
      sensorsByTypeObj.type === sensorsType
        ? {
            ...sensorsByTypeObj,
            isApproximate: false,
            chartType: 'line',
            lineColor: '#7cb5ec',
          }
        : sensorsByTypeObj,
    );
  }

  switchApproximate(sensorsTypeObj) {
    const sensorsObjByType = this.sensorsByTypeList.find(
      ({ type }) => type === sensorsTypeObj.type,
    );

    const sensorsByType = sensorsObjByType.sensors;
    const selectedSensorsByType = sensorsObjByType.selectedSensors;

    if (sensorsTypeObj.isApproximate) {
      this.onAllSensorsRemovedByType(sensorsTypeObj.type);

      const approximatedSensors = sensorsByType
        .map(({ data }) => data)
        .reduce((a, b) => a.concat(b))
        .sort((a, b) => a[0] - b[0]);

      this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(res => {
        const newSeries = {
          name: sensorsTypeObj.type,
          data: approximatedSensors,
          type: sensorsTypeObj.chartType,
          color: sensorsTypeObj.lineColor,
        };

        res.addSeries(newSeries, true);
      });
    } else {
      this.onAllSensorsRemovedByType(sensorsTypeObj.type);

      selectedSensorsByType.forEach(sensor =>
        this.onSensorSelected(sensor, sensorsTypeObj.chartType),
      );
    }
  }

  ngOnDestroy() {}
}
