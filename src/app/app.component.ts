import { Component, ViewChild } from '@angular/core';

import { ChartsListComponent } from './components/charts-list/charts-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild(ChartsListComponent, { static: false })
  chartsListComponent: ChartsListComponent;

  addChart() {
    this.chartsListComponent.addChart();
  }

  removeChart() {}
}
