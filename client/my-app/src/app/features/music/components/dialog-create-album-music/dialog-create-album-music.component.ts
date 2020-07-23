import { DetailAlbumMusic } from './../../core/interface/detail-album-music.interface';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// Rxjs
import { Subscription, Observable } from 'rxjs';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { AddUserAlbum } from './../../state/music.actions';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Service
import { MusicService } from '../../services/music.service';

@Component({
  selector: 'app-dialog-create-album-music',
  templateUrl: './dialog-create-album-music.component.html',
  styleUrls: ['./dialog-create-album-music.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCreateAlbumMusicComponent implements OnInit, OnDestroy {
  @ViewChild('coverInput') coverInput: ElementRef;
  createAlbumForm: FormGroup;
  cover: string;
  textMainBtn: string;
  subUserId$: Subscription;
  userId: string;
  loading = false;
  constructor(
    public dialogRef: MatDialogRef<DialogCreateAlbumMusicComponent>,
    @Inject(MAT_DIALOG_DATA) public album: DetailAlbumMusic | null,
    private store$: Store<AppState>,
    private musicServive: MusicService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.createAlbumForm = new FormGroup({
      name: new FormControl(this.album ? this.album.name : '', Validators.required),
      describe: new FormControl(this.album ? this.album.content : ''),
    });
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
    this.cover = this.album ? this.album.cover : null;
    this.textMainBtn = this.album ? 'Sửa' : 'Tạo';
  }
  ngOnDestroy() {
    this.subUserId$.unsubscribe();
  }
  /*
  @ Clase dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Event change value input upload song
  */
  onChangeAlbumCoverInput(input: any) {
    this.previewAlbumCover(input.target.files);
  }
  /*
  @ Show song from file-input or drop directive
  @ Input: file list
  */
  previewAlbumCover(fileList: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    if (fileList[0].type.indexOf('image') > -1) {
      reader.onload = (event) => {
        this.cover = event.target.result as string;
        this.ref.markForCheck();
      };
    }
  }
  /*
  @ Create Album
  */
  createAlbum() {
    this.musicServive.createAlbum(this.userId, this.createAlbumForm.value.name, this.cover, this.createAlbumForm.value.describe).subscribe(
      res => {
        this.loading = false;
        if (res) {
          this.store$.dispatch(new AddUserAlbum({ album: res }));
          this.onNoClick();
        } else {
          this.createAlbumForm.enable();
          this.textMainBtn = 'Thử lại';
        }
      }
    )
  }
  /*
  @ Edit album
  */
  editAlbum() {
    this.musicServive.editAlbum(this.userId, this.album.albumId, this.createAlbumForm.value.name, this.createAlbumForm.value.describe, this.cover).subscribe(
      res => {
        this.loading = false;
        if (res) {
          const newDetailAlbum: DetailAlbumMusic = {
            albumId: this.album.albumId,
            content: this.createAlbumForm.value.describe,
            cover: this.cover,
            name: this.createAlbumForm.value.name,
            quantitySong: this.album.quantitySong,
            quantityTime: this.album.quantityTime,
            status: this.album.status
          }
          this.dialogRef.close(newDetailAlbum);
        } else {
          this.createAlbumForm.enable();
          this.textMainBtn = 'Thử lại';
        }
      }
    )
  }
  /*
  @ 
  */
  onMainButton() {
    this.loading = true;
    this.createAlbumForm.disable();
    if (this.album == null) {
      this.createAlbum();
    } else {
      this.editAlbum();
    }
  }
}
