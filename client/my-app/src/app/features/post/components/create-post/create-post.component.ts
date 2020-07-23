import { AppState } from './../../../../core/state/index';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { trigger } from '@angular/animations';
import { fadeIn } from 'src/app/shared/core/animation/fade-in.animation';
// RX
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
// Mat
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
// Interface
import { FilePreview } from './../../core/interface/file-preview.interface';
// Serivce
import { PostService } from './../../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreatePostComponent } from '../dialog-create-post/dialog-create-post.component';
import { Store, select } from '@ngrx/store';
import { selectAvatar } from 'src/app/core/state/user-auth/user-auth.selectors';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class CreatePostComponent implements OnInit {
  @Input() ownOption: boolean;
  userAvatar$: Observable<string>;
  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>
  ) {

  }
  ngOnInit() {
    this.userAvatar$ = this.store.pipe(select(selectAvatar));
  }
  /*
  @ Open dialog create post
  */
  onClickOpenDialogCreatePost() {
    const dialogRef = this.dialog.open(DialogCreatePostComponent, {
      width: '540px',
      maxHeight: '90vh',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
