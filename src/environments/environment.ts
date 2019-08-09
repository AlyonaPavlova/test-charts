// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Options } from 'highcharts/highstock';

export const environment = {
  production: false,
};

// For first chart to display date picker
export function getDefaultChartOptions(chartsList) {
  const chartOptions: Options = {
    xAxis: {
      events: {
        afterSetExtremes: (e: any) => {
          chartsList.forEach((chart: any, i) => {
            if (chart && i !== 0) {
              chart.ref.xAxis[0].setExtremes(e.min, e.max);
            }
          });
        },
      },
    },
    chart: {
      spacingLeft: 20,
      spacingRight: 20,
    },
    title: {
      text: 'Chart №1',
    },
    series: [],
  };

  return chartOptions;
}

// For subsequent charts added manually
export function getNewChartOptions(chartNumber) {
  const chartOptions: Options = {
    rangeSelector: {
      enabled: false,
    },
    chart: {
      spacingLeft: 20,
      spacingRight: 20,
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
  },
  {
    name: 'Humidity Sensors',
    type: 'humidity',
    units: '%',
    sensors: [],
    selectedSensors: [],
  },
  {
    name: 'Light Sensors',
    type: 'light',
    units: 'lm',
    sensors: [],
    selectedSensors: [],
  },
];

export const maxChartsNumber = 4;
export const minSensorsNumber = 5;
export const maxSensorsNumber = 11;

export const defaultChartType = 'line';
export const defaultLineColor = '#7cb5ec';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
