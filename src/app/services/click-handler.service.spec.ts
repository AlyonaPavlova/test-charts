import { TestBed } from '@angular/core/testing';

import { ClickHandlerService } from './click-handler.service';

describe('ClickHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClickHandlerService = TestBed.get(ClickHandlerService);
    expect(service).toBeTruthy();
  });
});
