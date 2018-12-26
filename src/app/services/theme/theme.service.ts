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
    if (/^(?:[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(localStorage.getItem('theme'))) {
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

  resetTheme() {
    this.setTheme(defaultThemeColor);
  }

  getThemeSubject() {
    return this.themeSubject;
  }

  private sendUpdate() {
    this.themeSubject.next(this.themeColor);
  }
}
