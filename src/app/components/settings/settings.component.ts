import { ThemeService } from './../../services/theme/theme.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public color: string;
  private previousColor: string;
  @ViewChild('themeInput') themeInput: NgModel;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.getThemeSubject().subscribe(color => {
      if (color !== this.color) {
        this.previousColor = color;
        this.color = color;
      }
    });
  }

  setTheme() {
    this.previousColor = this.color;
    this.themeService.setTheme(this.color);
    this.themeInput.control.markAsPristine();
  }

  discardChanges() {
    this.color = this.previousColor;
    this.themeInput.control.markAsPristine();
  }

}
