// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Options } from 'highcharts/highstock';

export const environment = {
  production: false,
};

export function getDefaultChartOptions(chartName, sensorsList) {
  const chartOptions: Options = {
    rangeSelector: {
      inputEnabled: false,
    },
    chart: {
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 10,

      width: 700,
      height: 400,

      backgroundColor: '#f8f9fa',
    },
    navigator: {
      enabled: true,
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    title: {
      text: chartName,
      align: 'left',
      x: 210,
      margin: 20,
      style: { fontWeight: 'bold', fontSize: '18px' },
    },
    series: sensorsList || [],
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

export const chartTypes = ['line', 'bar'];

export const serverUrl = 'http://localhost:5000';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
