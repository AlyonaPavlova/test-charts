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

import { sensors } from '../../../environments/environment';
import { getSensorsData } from '../../../utils';

@Component({
  selector: 'app-output-chart',
  templateUrl: './output-chart.component.html',
  styleUrls: ['./output-chart.component.css'],
})
export class OutputChartComponent implements OnInit, OnDestroy {
  sensorsByTypeList = sensors;

  @Input() chartOptions: any;

  @Output() newChartEvent = new EventEmitter<any>();

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

  onChangeChartProperty(sensorsTypeObj) {
    const sensorsByTypeNames = this.sensorsByTypeList
      .find(({ type }) => type === sensorsTypeObj.type)
      .sensors.map(({ name }) => name);

    this.stockChart.ref$.subscribe(({ series }) => {
      series.forEach((serie, i) => {
        if (R.includes(serie.name, sensorsByTypeNames)) {
          series[i].update({
            type: sensorsTypeObj.chartType,
            color: sensorsTypeObj.lineColor,
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
        const newSerie = { ...sensor, type: chartType };

        chart.addSeries(newSerie, true);
      }
    });
  }

  onSensorRemoved(sensor) {
    this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(({ series }) => {
      series.find(({ name }) => sensor.label === name).remove();
    });
  }

  onAllSensorsRemovedByType(sensorsType, approximateChartName?) {
    const sensorsByTypeNames = this.sensorsByTypeList
      .find(({ type }) => type === sensorsType)
      .sensors.map(({ name }) => name);

    this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(({ series }) => {
      const indexesArr = series
        .filter(
          ({ name }) =>
            sensorsByTypeNames.includes(name) || name === approximateChartName,
        )
        .map((item, i) => i);

      let count = 0;

      for (const i of indexesArr) {
        if (indexesArr.pop() === i) {
          series[i].remove();
        }

        if (count === 0) {
          series[i].remove();
        } else {
          series[i - 1].remove();
        }

        count++;
      }
    });
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
        const newSerie = {
          name: sensorsTypeObj.type,
          data: approximatedSensors,
        };

        res.addSeries(newSerie, true);
      });
    } else {
      this.onAllSensorsRemovedByType(sensorsTypeObj.type, sensorsTypeObj.type);

      selectedSensorsByType.forEach(sensor =>
        this.onSensorSelected(sensor, sensorsTypeObj.chartType),
      );
    }
  }

  ngOnDestroy() {}
}
