import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogPostViewData } from '../../core/interface/dialog-post-view-data.interface';

@Component({
  selector: 'app-dialog-delete-post',
  templateUrl: './dialog-delete-post.component.html',
  styleUrls: ['./dialog-delete-post.component.scss']
})
export class DialogDeletePostComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogDeletePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogPostViewData
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
