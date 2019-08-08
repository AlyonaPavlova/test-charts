import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // first = {
  //   xAxis: {
  //     events: {
  //       afterSetExtremes: e => {
  //         this.charts.forEach((chart, i) => {
  //           if (i !== 0) {
  //             chart.xAxis[0].setExtremes(e.min, e.max);
  //           }
  //         });
  //       }
  //     }
  //   },
  //     title: {
  //       text: 'AAPL Stock Price'
  //     },
  //     series: [{
  //       type: 'line',
  //       tooltip: {
  //         valueDecimals: 2
  //       },
  //       name: 'AAPL',
  //       data,
  //     }]
  //   };
}
