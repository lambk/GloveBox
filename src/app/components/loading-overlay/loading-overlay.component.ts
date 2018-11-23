import { LoadingService } from './../../services/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  animations: [
    trigger('loadingFade', [
      transition(':leave', [
        animate(300, style({
          opacity: 0
        }))
      ])
    ])
  ]
})
export class LoadingOverlayComponent implements OnInit {

  show = false;
  private messages = ['Starting engine', 'Topping up oil', 'Pumping gas', 'Unlocking doors', 'Releasing brakes'];
  message = undefined;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.getLoadingObservable()
      .subscribe((newState) => {
        this.message = this.messages[Math.floor(Math.random() * this.messages.length)];
        this.show = newState;
      });
  }

}
