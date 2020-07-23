import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsForHomeComponent } from './components/ads-for-home/ads-for-home.component';



@NgModule({
  declarations: [AdsForHomeComponent],
  imports: [
    CommonModule
  ],
  exports: [AdsForHomeComponent]
})
export class AdvertiseModule { }
