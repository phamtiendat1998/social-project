import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// Animation
import { trigger } from '@angular/animations';
import { bottomNavBox } from '../../core/animation/bottom-nav-box.animation';

@Component({
  selector: 'app-noti-box',
  templateUrl: './noti-box.component.html',
  styleUrls: ['./noti-box.component.scss'],
})
export class NotiBoxComponent implements OnInit {
  @Output() close = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  /*
  @  Event close box
  */
  onCloseBox() {
    this.close.emit();
  }
}
