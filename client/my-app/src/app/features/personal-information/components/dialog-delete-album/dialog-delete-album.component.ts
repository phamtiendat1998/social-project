import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-album',
  templateUrl: './dialog-delete-album.component.html',
  styleUrls: ['./dialog-delete-album.component.scss']
})
export class DialogDeleteAlbumComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteAlbumComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
