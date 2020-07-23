import { Post } from './../../core/classs/post.class';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-share-post',
  templateUrl: './dialog-share-post.component.html',
  styleUrls: ['./dialog-share-post.component.scss']
})
export class DialogSharePostComponent implements OnInit {
  sharePostForm: FormGroup;
  isWaitingSharePost = false;
  constructor(
    public dialogRef: MatDialogRef<DialogSharePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post
  ) { }

  ngOnInit(): void {
    this.initSharePostForm();
  }
  /*
  @ Event close dialog
  */
  onClickCloseDialog(): void {
    this.dialogRef.close();
  }
  /*
  @ Init form group share post
  */
  initSharePostForm() {
    this.sharePostForm = new FormGroup({
      content: new FormControl(''),
      privacy: new FormControl(true)
    })
  }
  /* 
  @ Event share post
  */
  onSubmitSharePostForm() {

  }
}
