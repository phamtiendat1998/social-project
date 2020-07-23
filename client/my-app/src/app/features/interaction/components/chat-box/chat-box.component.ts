import { ChatUser } from '../../core/class/chat-user.class';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss']
})
export class ChatBoxComponent implements OnInit {
  @Input() chatUser: ChatUser;
  @Output() close = new EventEmitter();
  @Output() hide = new EventEmitter();
  isDataLoaded = false;
  constructor() { }
  ngOnInit() {
    setTimeout(() => {
      this.isDataLoaded = true;
    }, 1000);
  }
  /*
  @ Event close chat box
  @ Input emit: user id
  */
  onClose() {
    this.close.emit(this.chatUser.UserInfo.userId);
  }
  /*
  @ Event hide chat box
  @ Input emit: user id
  */
  onHide() {
    this.hide.emit();
  }
}
