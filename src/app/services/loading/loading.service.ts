import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingObservable = new ReplaySubject<boolean>(1);

  constructor() { }

  getLoadingObservable() {
    return this.loadingObservable;
  }

  setLoadingState(showLoading: boolean) {
    this.loadingObservable.next(showLoading);
  }
}
