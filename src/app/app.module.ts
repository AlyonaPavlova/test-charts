import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highstock from 'highcharts/modules/stock.src';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OutputChartComponent } from './components/output-chart/output-chart.component';
import { NavComponent } from './components/nav/nav.component';
import { ChartsListComponent } from './components/charts-list/charts-list.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputChartComponent,
    NavComponent,
    ChartsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartModule,
    FormsModule,
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ highstock ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
