export const environment = {
  production: true
};

export function getDefaultChartOptions(chartNumber, data) {
  return {
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
        data,
      },
    ],
  };
}

export const maxChartsNumber = 4;
