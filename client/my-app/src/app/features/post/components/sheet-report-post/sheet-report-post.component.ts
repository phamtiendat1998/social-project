import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-sheet-report-post',
  templateUrl: './sheet-report-post.component.html',
  styleUrls: ['./sheet-report-post.component.scss']
})
export class SheetReportPostComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<SheetReportPostComponent>
  ) { }

  ngOnInit(): void {
  }
  /*
  @ Pick up report
  */
  onPickUpReport(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
