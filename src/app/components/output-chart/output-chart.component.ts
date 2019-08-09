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
export class OutputChartComponent implements OnInit, OnDestroy {
  sensorsByTypeList = sensors;
  chartType = defaultChartType;
  lineColor = defaultLineColor;

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

  onChangeChartProperty(sensorsType) {
    // this.stockChart.ref.update({
    //   series: this.stockChart.options.series.map(item => {
    //     return { ...item, color: this.lineColor, type: this.chartType };
    //   }),
    // });

    const sensorsByTypeNames = this.sensorsByTypeList
      .find(({ type }) => type === sensorsType)
      .sensors.map(({ name }) => name);

    this.stockChart.ref$.subscribe(chart => {
      chart.series.forEach((serie, i) => {
        if (R.includes(serie.name, sensorsByTypeNames)) {
          chart.series[i].update({
            type: this.chartType,
            color: this.lineColor,
          });
        }
      });

      // const newSeries = chart.series.map(item => {
      //   return { ...item, color: this.lineColor, type: this.chartType };
      // });
      //
      // const colors = ['#FF530D', '#E82C0C', '#FF0000', '#E80C7A', '#E80C7A'];
      //
      // chart.update({
      //   colors,
      // });
      // chart.update({
      //   series: newSeries,
      // }, false);
    });
  }

  onSensorSelected(chart) {
    this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(res => {
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
    this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(({ series }) => {
      series.find(({ name }) => chart.label === name).remove(true);
    });
  }

  // @TODO: remove sensors only current type
  onAllSensorsRemoved() {
    this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(({ series }) => {
      while (series.length > 0) {
        series[0].remove(true);
      }
    });
  }

  switchApproximate(sensorsType) {
    if (this.isApproximate) {
      const sensorsByType = this.sensorsByTypeList.find(
        ({ type }) => type === sensorsType,
      ).sensors;

      const approximatedSensors = sensorsByType
        .map(({ data }) => data)
        .reduce((a, b) => a.concat(b))
        .sort((a, b) => a[0] - b[0]);

      this.onAllSensorsRemoved();

      this.stockChart.ref$.pipe(untilDestroyed(this)).subscribe(res => {
        const newSerie = {
          name: sensorsType,
          data: approximatedSensors,
        };

        res.addSeries(newSerie, true);
      });
    } else {
    }
  }

  ngOnDestroy() {}
}
