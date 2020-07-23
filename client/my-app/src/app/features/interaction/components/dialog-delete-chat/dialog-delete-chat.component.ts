import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-chat',
  templateUrl: './dialog-delete-chat.component.html',
  styleUrls: ['./dialog-delete-chat.component.scss']
})
export class DialogDeleteChatComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }
  /*
   @ Close dialog
   */
  onClickCloseDialog() {
    this.dialogRef.close();
  }
}
