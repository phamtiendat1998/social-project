import { Component, OnInit, ViewChildren, ElementRef, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
const ANIMATION_TIMINGS = '6000ms linear';
@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss'],
  animations: []
})
export class PreloaderComponent implements OnInit {
  @ViewChildren('pathTag') path: QueryList<ElementRef>;
  @Output() timeOutOutput = new EventEmitter<boolean>(false);
  constructor() { }

  ngOnInit() {

  }
  getLengthStrokeOffSetElement() {
    this.path.forEach((element, i) => {
      console.log(i, element.nativeElement.getTotalLength());
    });
  }
}
