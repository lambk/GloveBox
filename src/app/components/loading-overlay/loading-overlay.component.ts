import { LoadingService } from './../../services/loading/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.css']
})
export class LoadingOverlayComponent implements OnInit {

  show = false;
  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.getLoadingObservable().subscribe((newState) => this.show = newState);
  }

}
