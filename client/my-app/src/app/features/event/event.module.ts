import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Mat
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
// Component
import { EventForHomeComponent } from './components/event-for-home/event-for-home.component';



@NgModule({
  declarations: [EventForHomeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [EventForHomeComponent]
})
export class EventModule { }
