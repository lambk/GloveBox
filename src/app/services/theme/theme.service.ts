import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

const defaultThemeColor = '212F3D';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeColor: string;
  private themeSubject: ReplaySubject<string> = new ReplaySubject<string>();

  constructor() {
    if (/^[0-9A-Fa-f]{6}$/.test(localStorage.getItem('theme'))) {
      this.themeColor = localStorage.getItem('theme');
    } else {
      this.themeColor = defaultThemeColor;
    }
    this.sendUpdate();
  }

  setTheme(color: string) {
    this.themeColor = color;
    localStorage.setItem('theme', color);
    this.sendUpdate();
  }

  getThemeSubject() {
    return this.themeSubject;
  }

  private sendUpdate() {
    this.themeSubject.next(this.themeColor)
  }
}
