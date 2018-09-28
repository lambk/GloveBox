import { Component, Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EntryComponent } from './entry/entry.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingManager {

  private loadingObservable: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  getLoadingObservable(): Subject<boolean> {
    return this.loadingObservable;
  }

  setLoadingState(state: boolean): void {
    this.loadingObservable.next(state);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GloveBox';
  private showEntry: boolean = true;
  private showLoading: boolean = false;

  constructor(private router: Router, private authService: AuthService, private loadingManager: LoadingManager) {
  }

  ngOnInit() {
    if (this.showEntry && window.location.pathname !== '/') {
      this.router.navigateByUrl('/');
    }
    this.authService.getLoginObservable().subscribe((loggedIn) => this.showEntry = !loggedIn);
    this.loadingManager.getLoadingObservable().subscribe((showLoading) => this.showLoading = showLoading);

    let storedEmail = localStorage.getItem('email');
    let storedToken = localStorage.getItem('token');
    if (storedEmail !== null && storedToken !== null) {
      this.loadingManager.setLoadingState(true);
      this.authService.resumeSession(storedToken)
        .finally(() => this.loadingManager.setLoadingState(false));
    }
  }
}
