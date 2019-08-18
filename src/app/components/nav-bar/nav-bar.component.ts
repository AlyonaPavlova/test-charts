import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { NgxSmartModalService } from 'ngx-smart-modal';

import { maxChartsNumber } from '../../../environments/environment';
import { ClickHandlerService } from '../../services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Output() addChartClickEvent = new EventEmitter<any>();

  chartsNumber: number;
  maxChartsNumber = maxChartsNumber;

  isLogged = false;

  constructor(
    private clickHandlerService: ClickHandlerService,
    public ngxSmartModalService: NgxSmartModalService,
  ) {}

  ngOnInit() {
    this.clickHandlerService.actions.subscribe(res => {
      if (res) {
        this.chartsNumber = res.payload;
      }
    });
  }

  onClickAddChart() {
    this.addChartClickEvent.emit();
  }

  onLoggedIn() {
    this.isLogged = true;
  }
}
