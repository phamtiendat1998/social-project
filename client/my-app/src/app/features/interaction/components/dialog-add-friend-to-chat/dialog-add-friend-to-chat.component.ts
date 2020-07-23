import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchToChatFriend } from '../../core/class/search-to-chat-friend.class';

@Component({
  selector: 'app-dialog-add-friend-to-chat',
  templateUrl: './dialog-add-friend-to-chat.component.html',
  styleUrls: ['./dialog-add-friend-to-chat.component.scss']
})
export class DialogAddFriendToChatComponent implements OnInit {
  friends: SearchToChatFriend[] = [];
  isWaiting = true;
  constructor(
    public dialogRef: MatDialogRef<DialogAddFriendToChatComponent>,
  ) { }

  ngOnInit(): void {
    this.fakeData();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Fake data
  */
  fakeData() {
    setTimeout(() => {
      this.friends = [
        new SearchToChatFriend('', 'Hạ', 'Duy', '../../../../../assets/images/duy.jpg'),
        new SearchToChatFriend('', 'Bùi Sĩ', 'Nguyên', '../../../../../assets/images/nguyen.jpg'),
        new SearchToChatFriend('', 'Huấn', 'Đại Ka', '../../../../../assets/images/huan-rose.jpg'),
        new SearchToChatFriend('', 'Hạ', 'Duy', '../../../../../assets/images/duy.jpg'),
        new SearchToChatFriend('', 'Bùi Sĩ', 'Nguyên', '../../../../../assets/images/nguyen.jpg'),
        new SearchToChatFriend('', 'Huấn', 'Đại Ka', '../../../../../assets/images/huan-rose.jpg'),
      ];
      this.isWaiting = false;
    }, 1000);
  }
}
