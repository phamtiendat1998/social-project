import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
// Cropper
import { ImageCroppedEvent } from 'ngx-image-cropper';
// Service
import { ImagePersonalInformationService } from './../../services/image-personal-information.service';
// Store
import { AppState } from 'src/app/core/state';
import { Store } from '@ngrx/store';
import { SaveAvatarUserAuth } from 'src/app/core/state/user-auth/user-auth.actions';

@Component({
  selector: 'app-dialog-upload-avatar',
  templateUrl: './dialog-upload-avatar.component.html',
  styleUrls: ['./dialog-upload-avatar.component.scss']
})
export class DialogUploadAvatarComponent implements OnInit {
  turnOnEditor = false;
  imageChangedEvent: any = '';
  droppedImage = '';
  croppedImage: any = '';
  uploading = false;
  textUploadBtn = 'Lưu';
  constructor(
    public dialogRef: MatDialogRef<DialogUploadAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: string,
    private imagePersonalInformationService: ImagePersonalInformationService,
    private store$: Store<AppState>,
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
  }
  /*
  @ Event close dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }
  // Event change input upload 
  fileChangeListener(event: any): void {
    this.imageChangedEvent = event;
  }
  /*
  @ Event file dropped of dropzone
  @ Input: file output from directie 
  @ Set dropped image base64 into cropper
  */
  onFileDropped(event) {
    this.droppedImage = event;
  }
  /*
  @ Event copped image
  */
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  // Image loaded into cropper
  imageLoaded() {
    this.turnOnEditor = true;
  }
  /*
  @
  */
  loadImageFailed() {
  }
  /*
  @ Pick image for editor
  @ Input : image source
  */
  pickImage(src) {
  }
  /*
  @ Cancel editor
  */
  cancelEditor() {
    this.turnOnEditor = false;
    this.imageChangedEvent = '';
    this.droppedImage = '';
  }
  /*
  @ Upload avatar connect api
  */
  uploadAvatarConnectApi() {
    this.uploading = true;
    this.imagePersonalInformationService.uploadAvatar(this.userId, this.croppedImage).subscribe(res => {
      if (res) {
        this.uploading = false;
        this.store$.dispatch(new SaveAvatarUserAuth({ avatar: this.croppedImage }));
        this.onNoClick();
      } else {
        this.textUploadBtn = 'Thử lại';
      }
    });
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, snackBarConfig);
  }
}
