import { Component, OnInit } from '@angular/core';
// Service
import { ThemeService } from './../../service/theme.service';

@Component({
  selector: 'app-theme-setting',
  templateUrl: './theme-setting.component.html',
  styleUrls: ['./theme-setting.component.scss']
})
export class ThemeSettingComponent implements OnInit {
  availbleThemes: string[] = [];
  availbleColors: string[] = [];
  activeColor: string;
  activeTheme: string;
  constructor(private themeSerivce: ThemeService) { }

  ngOnInit() {
    this.getAvailbleColors();
    this.getAvailbleThemes();
    this.getActiveColor();
    this.getActiveTheme();
  }
  /*
  @ Get avaiable theme
  */
  getAvailbleThemes() {
    this.availbleThemes = this.themeSerivce.getAvailableThemes;
  }
  /*
  @ Get avaiable color
  */
  getAvailbleColors() {
    this.availbleColors = this.themeSerivce.getAvailableColors;
  }
  /*
  @ Get active color
  */
  getActiveColor() {
    this.activeColor = this.themeSerivce.getActiveColor;
  }
  /*
  @ Get active theme
  */
  getActiveTheme() {
    this.activeTheme = this.themeSerivce.getActiveTheme;
  }
  /*
  @ Change theme
  */
  onChangeTheme() {
    if (this.activeTheme === 'dark-theme') {
      this.themeSerivce.setDarkTheme();
    } else if (this.activeTheme === 'light-theme') {
      this.themeSerivce.setLightTheme();
    }
  }
  /*
  @ Change color
  */
  onChangeColor() {
    if (this.activeColor === 'purple-color') {
      this.themeSerivce.setPurpleColor();
    } else if (this.activeColor === 'indigo-color') {
      this.themeSerivce.setIndogoColor();
    }
  }
}
