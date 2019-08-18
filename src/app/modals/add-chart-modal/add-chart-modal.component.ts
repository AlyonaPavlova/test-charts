import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgxSmartModalService } from 'ngx-smart-modal';
import { ClickHandlerService } from '../../services';
import {
  chartTypes,
  sensors,
  serverUrl,
} from '../../../environments/environment';

@Component({
  selector: 'app-add-chart-modal',
  templateUrl: './add-chart-modal.component.html',
  styleUrls: ['./add-chart-modal.component.css'],
})
export class AddChartModalComponent implements OnInit {
  @Input() isEditModal: boolean;
  @Input() currentChartName: string;
  @Input() chartOptions: any;

  sensorsByTypeList = sensors;

  chartsTypes = chartTypes;

  chartName: string;

  constructor(
    private ngxSmartModalService: NgxSmartModalService,
    private clickHandlerService: ClickHandlerService,
    private httpClient: HttpClient,
  ) {}

  ngOnInit() {
    this.httpClient.get(`${serverUrl}/api/sensors`).subscribe((res: any) => {
      this.sensorsByTypeList = this.sensorsByTypeList.map(sensorsTypeObj => {
        return {
          ...sensorsTypeObj,
          sensors: res
            .filter(({ type }) => type === sensorsTypeObj.type)
            .map(({ name, data }) => {
              return {
                name,
                data: data.map(({ date, value }) => [date, value]),
              };
            }),
        };
      });

      console.log('<<<<<<< Sensors by type data: ', this.sensorsByTypeList);

      if (this.isEditModal) {
        this.chartName = this.currentChartName;
        this.sensorsByTypeList = this.sensorsByTypeList.map(
          (sensorsByTypeObj: any) => {
            const regexp = new RegExp(sensorsByTypeObj.type, 'i');

            const sensorsByType = this.chartOptions.series.filter(item =>
              regexp.test(item.name),
            );

            return sensorsByType
              ? { ...sensorsByTypeObj, selectedSensors: sensorsByType }
              : sensorsByTypeObj;
          },
        );
      }
    });

    // Generate sensors
    // this.sensorsByTypeList = this.sensorsByTypeList.map(sensorsTypeObj => {
    //   return {
    //     ...sensorsTypeObj,
    //     sensors: getSensorsData(sensorsTypeObj.type),
    //   };
    // });
  }

  onCloseModal() {
    if (this.isEditModal) {
      this.ngxSmartModalService.getModal('editChartModal').close();
    } else {
      this.ngxSmartModalService.getModal('addChartModal').close();
    }
  }

  saveChart() {
    if (this.isEditModal) {
      this.onUpdateChart();
    } else {
      this.onAddChart();
    }
  }

  onAddChart() {
    this.clickHandlerService.emitClickEvent('addChart', {
      chartName: this.chartName,
      sensors: this.sensorsByTypeList
        .map(({ selectedSensors, chartType, lineColor }) =>
          selectedSensors.map(sensor => {
            return { ...sensor, type: chartType, color: lineColor };
          }),
        )
        .reduce((a, b) => a.concat(b)),
    });

    this.ngxSmartModalService.getModal('addChartModal').close();
  }

  onUpdateChart() {
    this.clickHandlerService.emitClickEvent('editChart', {
      chartName: this.currentChartName,
      newChartName: this.chartName,
      sensors: this.sensorsByTypeList
        .map(({ selectedSensors, chartType, lineColor }) =>
          selectedSensors.map(sensor => {
            return { ...sensor, type: chartType, color: lineColor };
          }),
        )
        .reduce((a, b) => a.concat(b)),
    });

    this.ngxSmartModalService.getModal('editChartModal').close();
  }
}
