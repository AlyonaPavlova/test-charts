import { Component, OnInit } from '@angular/core';

import {
  getFirstDefaultChartOptions,
  getDefaultChartOptions,
} from '../../../environments/environment';
import { ClickHandlerService } from '../../services';

@Component({
  selector: 'app-charts-list',
  templateUrl: './charts-list.component.html',
  styleUrls: ['./charts-list.component.css'],
})
export class ChartsListComponent implements OnInit {
  charts = [];

  defaultChartOptions = getFirstDefaultChartOptions(this.charts);
  options = [this.defaultChartOptions];

  constructor(private clickHandlerService: ClickHandlerService) {}

  ngOnInit() {}

  changeChartsList(chart) {
    this.charts = [...this.charts, chart];
  }

  // Adding chart options for display new chart
  addChart() {
    const newChartOptions = this.options.length
      ? getDefaultChartOptions(this.options.length + 1)
      : getFirstDefaultChartOptions(this.charts);

    this.options = [...this.options, newChartOptions];

    this.updateFirstChartProperty();

    this.clickHandlerService.emitClickEvent('add', this.options.length);
  }

  removeChart(chartOptions) {
    this.options = this.options.filter(
      ({ title }) => title.text !== chartOptions.title.text,
    );
    this.charts = this.charts.filter(
      ({ options }) => options.title.text !== chartOptions.title.text,
    );

    this.updateFirstChartProperty();

    this.clickHandlerService.emitClickEvent('remove', this.options.length);
  }

  // For common date picker
  updateFirstChartProperty() {
    this.charts[0].ref.update({
      xAxis: {
        events: {
          afterSetExtremes: (e: any) => {
            this.charts.forEach((chart: any, i) => {
              if (chart && i !== 0) {
                chart.ref.xAxis[0].setExtremes(e.min, e.max);
              }
            });
          },
        },
      },
    });
  }
}
