import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
// Service
import { ThemeService } from './features/setting/service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  constructor(
    public overlay: Overlay,
    public viewContainerRef: ViewContainerRef,
    private themeService: ThemeService
  ) { }
  ngOnInit() {
    this.activeTheme();
  }
  /*
  @ Check theme in Storage
  @ Active theme
  */
  activeTheme() {
    this.themeService.checkThemeColorInLocalStorage();
  }
}
