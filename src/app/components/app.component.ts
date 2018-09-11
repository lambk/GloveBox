import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GloveBox';
  private loggedIn: boolean = false;
  private loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    if (!this.loggedIn && window.location.pathname !== '/') {
      this.router.navigateByUrl('/');
    }
    this.authService.getLoginObservable().subscribe((loggedIn) => this.loggedIn = loggedIn);
    let storedEmail = localStorage.getItem('email');
    let storedToken = localStorage.getItem('token');
    if (storedEmail !== null && storedToken !== null) {
      this.loading = true;
      this.authService.resumeSession(storedEmail, storedToken)
        .then(() => {}, () => {}).then(() => this.loading = false);
    }
  }
}
