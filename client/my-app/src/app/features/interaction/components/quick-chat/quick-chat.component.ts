import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, OnDestroy } from '@angular/core';
// Dialog
import { MatDialog } from '@angular/material/dialog';
// Compoents
import { DialogAddFriendToChatComponent } from '../dialog-add-friend-to-chat/dialog-add-friend-to-chat.component';
import { ChatBoxComponent } from './../chat-box/chat-box.component';
// Class
import { ChatUser } from './../../core/class/chat-user.class';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-quick-chat',
  templateUrl: './quick-chat.component.html',
  styleUrls: ['./quick-chat.component.scss']
})
export class QuickChatComponent implements OnInit, OnDestroy {
  @ViewChild('hostViewChatBox', { read: ViewContainerRef }) hostViewChatBox: ViewContainerRef;
  chatUsers: ChatUser[] = [];
  openingChatUserId: string;
  hideSub$: Subscription;
  closeSub$: Subscription;
  constructor(
    public dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.fakeData();
  }
  ngOnDestroy() {
    if (this.hideSub$) {
      this.hideSub$.unsubscribe();
    }
    if (this.closeSub$) {
      this.closeSub$.unsubscribe();
    }
  }
  /*
  @ Open dialog search user to chat
  */
  onClickOpenDialogSearchUser() {
    const dialogRef = this.dialog.open(DialogAddFriendToChatComponent, {
      width: '540px',
      maxHeight: '80vh',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /*
  @ Fake data
  */
  fakeData() {
    const user1 = new ChatUser('1', 'Hạ', 'Duy', '../../../../../assets/images/duy.jpg');
    const user2 = new ChatUser('2', 'Bùi Sĩ', 'Nguyên', '../../../../../assets/images/nguyen.jpg');
    this.chatUsers.push(user1);
    this.chatUsers.push(user2);
  }
  /*
  @ Open chat box
  @ Input User
  */
  openChatBox(user: ChatUser) {
    this.openingChatUserId = user.UserInfo.userId;
    const chatBoxCmpFactory = this.componentFactoryResolver.resolveComponentFactory(ChatBoxComponent);
    this.hostViewChatBox.clear();
    const componentRef: ComponentRef<ChatBoxComponent> = this.hostViewChatBox.createComponent(chatBoxCmpFactory);
    componentRef.instance.chatUser = user;
    this.hideSub$ = componentRef.instance.hide.subscribe(
      () => {
        this.hostViewChatBox.clear();
        this.hideSub$.unsubscribe();
      }
    );
    this.closeSub$ = componentRef.instance.close.subscribe(
      (userId) => {
        this.hostViewChatBox.clear();
        this.closeChatBox(userId);
        this.closeSub$.unsubscribe();
      }
    );
  }
  /*
  @ Close chat box
  @ Input : User Id, Mouse Event
  */
  closeChatBox(userId: string) {
    const index = this.chatUsers.findIndex(
      (user) => user.UserInfo.userId === userId
    );
    this.chatUsers.splice(index, 1);
    if (userId === this.openingChatUserId) {
      this.hostViewChatBox.clear();
    } else {
      return;
    }
  }
}
