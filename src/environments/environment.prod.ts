import { Options } from 'highcharts/highstock';

import { defaultChartData } from '../configs/defaultChartData';

export const environment = {
  production: true,
};

export function getDefaultChartOptions(chartNumber) {
  const chartOptions: Options = {
    rangeSelector: {
      inputEnabled: false,
    },
    chart: {
      spacingLeft: 30,
      spacingRight: 50,
    },
    navigator: {
      enabled: true,
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    legend: {
      enabled: true,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0,
    },
    title: {
      text: `Chart №${chartNumber}`,
    },
    series: [],
  };

  return chartOptions;
}

export const sensors = [
  {
    name: 'Temperature Sensors',
    type: 'temperature',
    units: '°C',
    sensors: [],
    selectedSensors: [],
    isApproximate: false,
    chartType: 'line',
    lineColor: '#7cb5ec',
  },
  {
    name: 'Humidity Sensors',
    type: 'humidity',
    units: '%',
    sensors: [],
    selectedSensors: [],
    isApproximate: false,
    chartType: 'line',
    lineColor: '#7cb5ec',
  },
  {
    name: 'Light Sensors',
    type: 'light',
    units: 'lm',
    sensors: [],
    selectedSensors: [],
    isApproximate: false,
    chartType: 'line',
    lineColor: '#7cb5ec',
  },
];

export const maxChartsNumber = 4;
export const minSensorsNumber = 5;
export const maxSensorsNumber = 11;

export const chartsTypes = ['line', 'bar'];
