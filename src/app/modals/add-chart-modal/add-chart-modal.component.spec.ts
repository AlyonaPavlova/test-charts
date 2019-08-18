import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChartModalComponent } from './add-chart-modal.component';

describe('AddChartModalComponent', () => {
  let component: AddChartModalComponent;
  let fixture: ComponentFixture<AddChartModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChartModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
