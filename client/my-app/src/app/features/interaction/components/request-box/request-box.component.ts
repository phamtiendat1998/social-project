import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-request-box',
  templateUrl: './request-box.component.html',
  styleUrls: ['./request-box.component.scss']
})
export class RequestBoxComponent implements OnInit {
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
