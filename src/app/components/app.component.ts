import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EntryComponent } from './entry/entry.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GloveBox';
  loggedIn;

  constructor(private router: Router) {
    this.loggedIn = localStorage.getItem('token') !== null;
  }

  ngOnInit() {
    if (!this.loggedIn && window.location.pathname !== '/') {
      this.router.navigateByUrl('/');
    }
  }
}
