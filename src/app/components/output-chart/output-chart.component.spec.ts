import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputChartComponent } from './output-chart.component';

describe('OutputChartComponent', () => {
  let component: OutputChartComponent;
  let fixture: ComponentFixture<OutputChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
