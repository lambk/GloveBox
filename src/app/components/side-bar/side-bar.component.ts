import { ThemeService } from './../../services/theme/theme.service';
import { LoadingService } from './../../services/loading/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

const iconColorToBlackThreshold = 'C';
const requiredRGBExceedingThreshold = 2;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  public href = '';
  public themeColor: string;

  constructor(private router: Router, private authService: AuthService, private loadingService: LoadingService,
    private themeService: ThemeService) { }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.href = e.url;
      }
    });
    this.themeService.getThemeSubject().subscribe((color: string) => this.themeColor = color);
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

  getIconColor() {
    if (this.themeColor === undefined) {
      return '#FFF';
    }
    let aboveThresholdCount = 0;
    for (let i = 0; i < this.themeColor.length; i += this.themeColor.length === 3 ? 1 : 2) {
      if (this.themeColor.charAt(i).toUpperCase() >= iconColorToBlackThreshold) {
        aboveThresholdCount++;
      }
    }
    return aboveThresholdCount >= requiredRGBExceedingThreshold ? '#000' : '#FFF';
  }
}
