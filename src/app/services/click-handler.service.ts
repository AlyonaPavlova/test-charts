import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClickHandlerService {
  actions = new BehaviorSubject<any>(null);

  constructor() {}

  emitClickEvent(action, payload) {
    this.actions.next({
      action,
      payload,
    });
  }
}
