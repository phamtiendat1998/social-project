import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {
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
