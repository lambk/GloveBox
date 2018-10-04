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
  showLoading = false;
  href: string = undefined;

  constructor(private router: Router, private authService: AuthService, private loadingManager: LoadingManager) {
  }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.href = e.url;
      }
    });
    this.loadingManager.getLoadingObservable().subscribe((status) => this.showLoading = status);

    if (localStorage.getItem('token') !== null) {
      this.loadingManager.setLoadingState(true);
      this.authService.resumeSession().subscribe((res) => {
        this.router.navigate(['/']);
      }, (err) => {
        this.router.navigate(['/login']);
      });
    }
  }
}
