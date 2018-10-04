import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loadingObservable = new Subject<boolean>();

  constructor() { }

  getLoadingObservable() {
    return this.loadingObservable;
  }

  setLoadingState(showLoading: boolean) {
    this.loadingObservable.next(showLoading);
  }

}
