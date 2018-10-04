import { LoadingService } from './../services/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'GloveBox';
  href: string = undefined;

  constructor(private router: Router, private authService: AuthService, private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.href = e.url;
      }
    });

    if (localStorage.getItem('token') !== null) {
      this.loadingService.setLoadingState(true);
      this.authService.resumeSession()
        .subscribe(() => this.router.navigate(['/']), () => this.router.navigate(['/login']))
        .add(() => this.loadingService.setLoadingState(false));
    }
  }
}
