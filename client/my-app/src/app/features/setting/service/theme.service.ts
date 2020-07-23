import { Injectable } from '@angular/core';
import { Theme } from '../core/interfaces/theme.interface';
import { light, dark, indigo, purple } from '../core/var/theme.var';
// Service
import { LocalService } from '../../../shared/services/local.service';
import { OverlayContainer } from '@angular/cdk/overlay';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeTheme: Theme = light;
  private availableThemes: Theme[] = [light, dark];
  private activeColor: Theme = indigo;
  private availableColor: Theme[] = [indigo, purple];
  constructor(
    private localService: LocalService,
    private overlay: OverlayContainer
  ) { }

  get getAvailableThemes(): string[] {
    return this.availableThemes.map(theme => {
      return theme.name;
    });
  }
  get getAvailableColors(): string[] {
    return this.availableColor.map(color => {
      return color.name;
    });
  }
  get getActiveTheme(): string {
    return this.activeTheme.name;
  }
  get getActiveColor(): string {
    return this.activeColor.name;
  }
  /*
  @ Set Purple color to Interface
  @ Set Purple color to Local Storage
  */
  setIndogoColor(): void {
    this.setActiveColor(purple, indigo);
    this.saveColorToLocalStorage(indigo.name);
  }
  /*
  @ Set Purple color to Interface
  @ Set Purple color to Local Storage
  */
  setPurpleColor(): void {
    this.setActiveColor(indigo, purple);
    this.saveColorToLocalStorage(purple.name);
  }
  /*
  @ Set Dark Theme to Interface
  @ Set Dark Theme to Local Storage
  */
  setDarkTheme(): void {
    this.setActiveColorTheme(dark);
    this.saveThemeToLocalStorage(dark);
    this.activeTheme = dark;
  }
  /*
  @ Set Light Theme to Interface
  @ Set Light Theme to Local Storage
  */
  setLightTheme(): void {
    this.setActiveColorTheme(light);
    this.saveThemeToLocalStorage(light);
    this.activeTheme = light;
  }
  /*
  @ Active color
  @ Input: Initial Color, Active Color
  */
  setActiveColor(initialColor: Theme, activeColor: Theme): void {
    if (document.body.classList.contains(initialColor.name)) {
      document.body.classList.remove(initialColor.name);
    }
    document.body.classList.add(activeColor.name);
    if (this.overlay.getContainerElement().classList.contains(initialColor.name)) {
      this.overlay.getContainerElement().classList.remove(initialColor.name);
    }
    this.overlay.getContainerElement().classList.add(activeColor.name);
    this.setActiveColorTheme(activeColor);
    this.activeColor = activeColor;
  }
  /*
  @ Active theme
  */
  setActiveColorTheme(theme: Theme): void {
    Object.keys(theme.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        theme.properties[property]
      );
    });
  }
  /*
  @ Save Theme to Local
  */
  saveColorToLocalStorage(color: string) {
    this.localService.save(this.localService.keyActiveColor, color);
  }
  /*
  @ Save Theme to Local
  */
  saveThemeToLocalStorage(theme: Theme) {
    this.localService.save(this.localService.keyActiveTheme, theme.name);
  }
  /*
  @ Check Theme in Local
  @ Then Set Theme by Local storage var
  */
  checkThemeColorInLocalStorage() {
    const theme = this.localService.get(this.localService.keyActiveTheme);
    const color = this.localService.get(this.localService.keyActiveColor);
    switch (theme) {
      case dark.name:
        this.setDarkTheme();
        break;
      default:
        this.setLightTheme();
    }
    switch (color) {
      case purple.name:
        this.setPurpleColor();
        break;
      default:
        this.setIndogoColor();
    }
  }
}
