import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchToChatFriend } from '../../core/class/search-to-chat-friend.class';

@Component({
  selector: 'app-dialog-members',
  templateUrl: './dialog-members.component.html',
  styleUrls: ['./dialog-members.component.scss']
})
export class DialogMembersComponent implements OnInit {
  friends: SearchToChatFriend[] = [];
  isWaiting = true;
  constructor(
    public dialogRef: MatDialogRef<DialogMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data
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
      ];
      this.isWaiting = false;
    }, 1000);
  }
}
