import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Components
import { PreloaderComponent } from './components/preloader/preloader.component';
import { PreloadIconComponent } from './components/preload-icon/preload-icon.component';
import { Error404Component } from './containers/error404/error404.component';
import { BirthdayInputComponent } from './components/birthday-input/birthday-input.component';
// Pipe
import { QuantityPipe } from './pipes/quantity.pipe';
import { ContentPipe } from './pipes/content.pipe';
import { ObsLoadingPipe } from './pipes/obs-loading.pipe';
// Direactive
import { LazyLoadImageDirective } from './directives/lazy-load-image.directive';
import { DragAndDropFileDirective } from './directives/drag-and-drop-file.directive';
// Mat
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
// Scroll
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    // Components
    PreloaderComponent,
    PreloadIconComponent,
    Error404Component,
    BirthdayInputComponent,
    // Pipe
    QuantityPipe,
    ContentPipe,
    ObsLoadingPipe,
    SafeUrlPipe,
    // Directive
    LazyLoadImageDirective,
    DragAndDropFileDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Mat
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    // Scroll
    InfiniteScrollModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    // Component
    PreloaderComponent,
    PreloadIconComponent,
    BirthdayInputComponent,
    // Pipe
    QuantityPipe,
    ContentPipe,
    ObsLoadingPipe,
    SafeUrlPipe,
    // Directive
    DragAndDropFileDirective,
    LazyLoadImageDirective,
    // Mat
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    // Scroll
    InfiniteScrollModule,
  ]
})
export class SharedModule { }
