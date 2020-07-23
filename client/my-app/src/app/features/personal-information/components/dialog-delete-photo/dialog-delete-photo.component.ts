import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-photo',
  templateUrl: './dialog-delete-photo.component.html',
  styleUrls: ['./dialog-delete-photo.component.scss']
})
export class DialogDeletePhotoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeletePhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
