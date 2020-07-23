import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sheet-save-post',
  templateUrl: './sheet-save-post.component.html',
  styleUrls: ['./sheet-save-post.component.scss']
})
export class SheetSavePostComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<SheetSavePostComponent>
  ) { }

  ngOnInit(): void {
  }
  /*
  @ Pick up save folder
  */
  onPickUpFolder(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
