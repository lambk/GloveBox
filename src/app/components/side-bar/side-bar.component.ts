import { LoadingService } from './../../services/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public href = '';

  constructor(private router: Router, private authService: AuthService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.href = e.url;
      }
    });
  }

  logout(): void {
    this.loadingService.setLoadingState(true);
    this.authService.logout()
      .subscribe()
      .add(() => {
        this.router.navigate(['/login']);
        this.loadingService.setLoadingState(false);
      });
  }
}
