import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingManager } from 'src/app/components/app.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public href: string = '';

  constructor(private router: Router, private authService: AuthService, private loadingManager: LoadingManager) { }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.href = e.url;
      }
    });
  }

  logout(): void {
    this.loadingManager.setLoadingState(true);
    this.authService.logout().then()
      .then(() => this.loadingManager.setLoadingState(false));
  }
}
