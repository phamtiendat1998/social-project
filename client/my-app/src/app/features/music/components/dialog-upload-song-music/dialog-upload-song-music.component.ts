import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// Rxjs
import { Subscription } from 'rxjs';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Interface
import { SongMusic } from './../../core/interface/song-music.interface';
// Service
import { MusicService } from './../../services/music.service';
// Store
import { AppState } from 'src/app/core/state';
import { Store, select } from '@ngrx/store';
import { AddUserSong } from './../../state/music.actions';
import { selectUserId } from 'src/app/core/state/user-auth/user-auth.selectors';
// Helper
import { calcTimeMusic } from 'src/app/shared/core/helper/calc-time-music';

@Component({
  selector: 'app-dialog-upload-song-music',
  templateUrl: './dialog-upload-song-music.component.html',
  styleUrls: ['./dialog-upload-song-music.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogUploadSongMusicComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileInputImg') fileInputImg: ElementRef;
  subUserId$: Subscription;
  userId: string;
  songPreview: SongMusic;
  songNameControl: FormControl;
  loading = false;
  textMainBtn = 'Upload';
  constructor(
    public dialogRef: MatDialogRef<DialogUploadSongMusicComponent>,
    @Inject(MAT_DIALOG_DATA) public albumId: string | null,
    private store$: Store<AppState>,
    private musicService: MusicService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.songNameControl = new FormControl('', Validators.required);
    this.songPreview = {
      id: null,
      cover: null,
      name: null,
      time: null,
      totalTime: null,
      url: null,
      userInfo: null
    }
    this.subUserId$ = this.store$.pipe(select(selectUserId)).subscribe(res => this.userId = res);
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
  onChangeSongInput(input: any) {
    this.previewSong(input.target.files);
  }
  /*
  @ Event change value input upload song
  */
  onChangeSongImgInput(input: any) {
    this.previewSongImg(input.target.files);
  }
  /*
  @ Show song from file-input or drop directive
  @ Input: file list
  */
  previewSong(fileList: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    if (fileList[0].type.indexOf('audio/mpeg') > -1) {
      reader.onload = (event) => {
        this.songPreview.url = event.target.result as string;
        this.ref.markForCheck();
      };
    }
  }
  /*
  @ Show song from file-input or drop directive
  @ Input: file list
  */
  previewSongImg(fileList: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    if (fileList[0].type.indexOf('image') > -1) {
      reader.onload = (event) => {
        this.songPreview.cover = event.target.result as string;
        this.ref.markForCheck();
      };
    }
  }
  /*
  @ Get song time
  */
  getDurationSong(event) {
    this.songPreview.totalTime = String(event.currentTarget.duration);
    this.songPreview.time = calcTimeMusic(String(event.currentTarget.duration));
  }
  /*
  @ Upload 
  */
  uploadSong() {
    this.songPreview.name = this.songNameControl.value;
    this.loading = true;
    this.songNameControl.disable();
    this.musicService.uploadSong(
      this.userId,
      this.albumId,
      this.songPreview.url,
      this.songPreview.cover,
      this.songPreview.name,
      this.songPreview.totalTime
    ).subscribe(
      res => {
        this.loading = true;
        if (res) {
          if (this.albumId === null) {
            this.store$.dispatch(new AddUserSong({ song: res }));
            this.onNoClick();
          } else {
            this.dialogRef.close(res);
          }
        } else {
          this.songNameControl.enable();
          this.textMainBtn = 'Thử lại';
        }
      }
    )
  }
}
