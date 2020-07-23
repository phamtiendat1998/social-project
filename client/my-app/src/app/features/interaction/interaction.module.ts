import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module
import { SharedModule } from 'src/app/shared/shared.module';
// Router
import { InteractionRoutingModule } from './interaction-routing.module';
// Mat
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
// Components
import { InteractiveTabComponent } from './components/interactive-tab/interactive-tab.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { FriendOnlineComponent } from './components/friend-online/friend-online.component';
import { BirthDayNoticationComponent } from './components/birth-day-notication/birth-day-notication.component';
import { DialogAddFriendToChatComponent } from './components/dialog-add-friend-to-chat/dialog-add-friend-to-chat.component';
import { QuickChatComponent } from './components/quick-chat/quick-chat.component';
import { RequestBoxComponent } from './components/request-box/request-box.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { NotiBoxComponent } from './components/noti-box/noti-box.component';
import { MessengerComponent } from './containers/messenger/messenger.component';
import { MessageChatComponent } from './components/message-chat/message-chat.component';
import { ChatComponent } from './containers/chat/chat.component';
import { ChatViewComponent } from './components/chat-view/chat-view.component';
import { ChatTabComponent } from './components/chat-tab/chat-tab.component';
import { DialogMediaChatComponent } from './components/dialog-media-chat/dialog-media-chat.component';
import { DialogMembersComponent } from './components/dialog-members/dialog-members.component';
import { DialogDeleteChatComponent } from './components/dialog-delete-chat/dialog-delete-chat.component';

@NgModule({
  declarations: [
    InteractiveTabComponent,
    ChatBoxComponent,
    FriendOnlineComponent,
    BirthDayNoticationComponent,
    DialogAddFriendToChatComponent,
    QuickChatComponent,
    RequestBoxComponent,
    MessageBoxComponent,
    NotiBoxComponent,
    MessengerComponent,
    MessageChatComponent,
    ChatComponent,
    ChatViewComponent,
    ChatTabComponent,
    DialogMediaChatComponent,
    DialogMembersComponent,
    DialogDeleteChatComponent
  ],
  imports: [
    CommonModule,
    // Module
    SharedModule,
    // Router
    InteractionRoutingModule,
    // Mat
    MatMenuModule,
    MatListModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatBadgeModule
  ],
  exports: [
    InteractiveTabComponent,
    FriendOnlineComponent,
    BirthDayNoticationComponent,
    QuickChatComponent
  ]
})
export class InteractionModule { }
