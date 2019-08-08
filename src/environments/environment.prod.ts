import { Options } from 'highcharts/highstock';

import { defaultChartData } from '../configs/defaultChartData';

export const environment = {
  production: true,
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
        data: defaultChartData,
      },
    ],
  };

  return chartOptions;
}

// For subsequent charts added manually
export function getNewChartOptions(chartNumber) {
  const chartOptions: Options = {
    rangeSelector: {
      enabled: false,
    },
    title: {
      text: `Chart №${chartNumber}`,
    },
    series: [
      {
        type: 'line',
        tooltip: {
          valueDecimals: 2,
        },
        name: 'AAPL',
        data: defaultChartData,
      },
    ],
  };

  return chartOptions;
}

export const sensors = [
  {
    name: 'Temperature Sensors',
    type: 'temperature',
  },
  {
    name: 'Humidity Sensors',
    type: 'humidity',
  },
  {
    name: 'Light Sensors',
    type: 'light',
  },
];

export const maxChartsNumber = 4;
export const minSensorsNumber = 5;
export const maxSensorsNumber = 11;

export const defaultChartType = 'line';
export const defaultLineColor = '#7cb5ec';
