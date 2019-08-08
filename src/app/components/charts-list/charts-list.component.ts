import { Component, OnInit } from '@angular/core';

import { Options } from 'highcharts/highstock';

import { data } from '../../data';
import { getDefaultChartOptions } from '../../../environments/environment';
import { ClickHandlerService } from '../../services';

@Component({
  selector: 'app-charts-list',
  templateUrl: './charts-list.component.html',
  styleUrls: ['./charts-list.component.css'],
})
export class ChartsListComponent implements OnInit {
  charts = [];

  first: Options = {
    xAxis: {
      events: {
        afterSetExtremes: e => {
          this.charts.forEach((chart, i) => {
            if (chart && i !== 0) {
              chart.ref.xAxis[0].setExtremes(e.min, e.max);
            }
          });
        },
      },
    },
    title: {
      text: 'Chart №1',
    },
    series: [
      {
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
        name: 'AAPL',
        data,
      },
    ],
  };

  second = {
    rangeSelector: {
      enabled: false,
    },
    title: {
      text: 'Chart №2',
    },
    series: [
      {
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
        name: 'AAPL',
        data,
      },
    ],
  };

  third = {
    rangeSelector: {
      enabled: false,
    },
    title: {
      text: 'Chart №3',
    },
    series: [
      {
        type: 'bar',
        tooltip: {
          valueDecimals: 2,
        },
        name: 'AAPL',
        data,
      },
    ],
  };

  options = [this.first, this.second, this.third];

  constructor(private clickHandlerService: ClickHandlerService) {}

  ngOnInit() {}

  addChart(chart) {
    this.charts = [...this.charts, chart];
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

  addNewChartOptions() {
    const defaultChartOptions = getDefaultChartOptions(
      this.options.length + 1,
      data,
    );

    // To display one time interval for all charts
    const newChartOptions = this.options.length
      ? {
          ...defaultChartOptions,
          rangeSelector: {
            enabled: false,
          },
        }
      : {
          ...defaultChartOptions,
          xAxis: {
            events: {
              afterSetExtremes: e => {
                this.charts.forEach((chart, i) => {
                  if (chart && i !== 0) {
                    chart.ref.xAxis[0].setExtremes(e.min, e.max);
                  }
                });
              },
            },
          },
        };

    // @ts-ignore
    this.options = [...this.options, newChartOptions];

    this.clickHandlerService.emitClickEvent('add', this.options.length);
  }
}
