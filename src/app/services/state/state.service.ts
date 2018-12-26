import { StateManager } from './../../interfaces/stateManager';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private managers: StateManager[];

  constructor() {
    this.managers = [];
  }

  registerStateManager(stateManager: StateManager) {
    this.managers.push(stateManager);
  }

  clearAllState() {
    this.managers.forEach((stateManager) => stateManager.clearState());
  }
}
