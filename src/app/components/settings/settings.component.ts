import { ThemeService } from './../../services/theme/theme.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public color: string;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  }

  themeTest() {
    this.themeService.setTheme(this.color);
  }

}
