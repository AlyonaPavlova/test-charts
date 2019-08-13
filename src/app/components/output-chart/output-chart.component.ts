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

import {
  chartsTypes,
  sensors,
  serverUrl,
} from '../../../environments/environment';
import { getSensorsData } from '../../../utils';
import { HttpClient } from '@angular/common/http';

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

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.stockChart = new StockChart(this.chartOptions);
    this.newChartEvent.emit(this.stockChart);

    // Generate random data
    this.sensorsByTypeList = this.sensorsByTypeList.map(sensorsTypeObj => {
      return {
        ...sensorsTypeObj,
        sensors: getSensorsData(sensorsTypeObj.type),
      };
    });

    this.httpClient.get(`${serverUrl}/sensorsData`).subscribe((res: any) => {
      console.log(res);

      this.sensorsByTypeList = this.sensorsByTypeList.map(sensorsTypeObj => {
        return {
          ...sensorsTypeObj,
          sensors: res
            .filter(({ type }) => type === sensorsTypeObj.type)
            .map(({ name, data }) => {
              return { name, data };
            }),
        };
      });

      console.log(this.sensorsByTypeList);
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

  onSensorSelected(sensor, sensorsByTypeObj) {
    const { chartType, lineColor, isApproximate } = sensorsByTypeObj;

    this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(chart => {
      const isExistSensor = R.includes(
        sensor.name,
        chart.series.map(({ name }) => name),
      );

      if (isApproximate) {
        // Approximate with new series arr
        this.switchApproximate(sensorsByTypeObj);
      } else {
        if (!isExistSensor) {
          const newSeries = { ...sensor, type: chartType, color: lineColor };

          // For calculate date range
          this.newSeriesEvent.emit(newSeries);

          chart.addSeries(newSeries, true);
        }
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
            sensorsByTypeObj,
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

  switchApproximate(sensorsByTypeObj) {
    const sensorsObjByType = this.sensorsByTypeList.find(
      ({ type }) => type === sensorsByTypeObj.type,
    );

    const sensorsByType = sensorsObjByType.sensors;
    const selectedSensorsByType = sensorsObjByType.selectedSensors;

    if (sensorsByTypeObj.isApproximate) {
      this.onAllSensorsRemovedByType(sensorsByTypeObj.type);

      const approximatedSensors = sensorsByType
        .map(({ data }) => data)
        .reduce((a, b) => a.concat(b))
        .sort((a, b) => a[0] - b[0]);

      this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(res => {
        const newSeries = {
          name: sensorsByTypeObj.type,
          data: approximatedSensors,
          type: sensorsByTypeObj.chartType,
          color: sensorsByTypeObj.lineColor,
        };

        res.addSeries(newSeries, true);
      });
    } else {
      this.onAllSensorsRemovedByType(sensorsByTypeObj.type);

      selectedSensorsByType.forEach(sensor =>
        this.onSensorSelected(sensor, sensorsByTypeObj),
      );
    }
  }

  ngOnDestroy() {}
}
