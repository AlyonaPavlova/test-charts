import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highstock from 'highcharts/modules/stock.src';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OutputChartComponent } from './components/output-chart/output-chart.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChartsListComponent } from './components/charts-list/charts-list.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { AddChartModalComponent } from './modals/add-chart-modal/add-chart-modal.component';
import { SignUpModalComponent } from './modals/sign-up-modal/sign-up-modal.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputChartComponent,
    NavBarComponent,
    ChartsListComponent,
    DatePickerComponent,
    AddChartModalComponent,
    SignUpModalComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    ColorPickerModule,
    NgxSmartModalModule.forRoot(),
  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [highstock] }],
  bootstrap: [AppComponent],
})
export class AppModule {}
