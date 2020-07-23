import { DialogDeleteChatComponent } from './../dialog-delete-chat/dialog-delete-chat.component';
import { DialogMembersComponent } from './../dialog-members/dialog-members.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMediaChatComponent } from '../dialog-media-chat/dialog-media-chat.component';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  titleState = 'default'
  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  /*
  @ Event open search message
  */
  onOpenSearch() {
    this.titleState = 'search';
  }
  /*
  @ Event open search message
  */
  onOpenRename() {
    this.titleState = 'rename';
  }
  /*
  @ Event switch defalt
  */
  onBackDefault() {
    this.titleState = 'default';
  }
  /*
  @ Event open dialog media
  */
  onOpenDialogMedia() {
    const dialogRef = this.dialog.open(DialogMediaChatComponent, {
      width: '70vw',
      height: '85vh',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /*
  @ Event open dialog meber
  */
  onOpenDialogMember() {
    const dialogRef = this.dialog.open(DialogMembersComponent, {
      width: '540px',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  /*
  @ Event open dialog delete chat
  */
  onOpenDialogDelete() {
    const dialogRef = this.dialog.open(DialogDeleteChatComponent, {
      width: '540px',
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
