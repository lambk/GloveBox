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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.href = e.url;
      }
    });
  }

  logout(): void {
    this.authService.logout().subscribe((res) => this.router.navigate(['/login']), (err) => this.router.navigate(['/login']));
    // this.router.navigate(['/login']);
  }
}
