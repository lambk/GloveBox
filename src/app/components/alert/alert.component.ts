import { AlertService } from './../../services/alert/alert.service';
import { AlertType } from 'src/app/constants';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('alertFade', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-10px)'}),
        animate(500, style({
          opacity: 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition(':leave', [
        animate(500, style({
          opacity: 0,
          transform: 'translateY(-10px)'
        }))
      ])
    ])
  ]
})
export class AlertComponent implements OnInit {

  show = false;
  message = undefined;
  type: AlertType = undefined;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getAlertObservable().subscribe((alert) => {
      this.show = true;
      this.message = alert.message;
      this.type = alert.type;
    });
  }

  closeAlert() {
    this.show = false;
  }

}
