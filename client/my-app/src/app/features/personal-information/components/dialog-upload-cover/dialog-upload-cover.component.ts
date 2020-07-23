import { Component, OnInit, Inject } from '@angular/core';
// Mat
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Interface
import { DialogData } from '../../core/interfaces/dialog-upload-avatar.interface';
// Cropper
import { ImageCroppedEvent } from 'ngx-image-cropper';
// Service
import { ImagePersonalInformationService } from '../../services/image-personal-information.service';

@Component({
  selector: 'app-dialog-upload-cover',
  templateUrl: './dialog-upload-cover.component.html',
  styleUrls: ['./dialog-upload-cover.component.scss']
})
export class DialogUploadCoverComponent implements OnInit {
  turnOnEditor = false;
  imageChangedEvent: any = '';
  droppedImage = '';
  croppedImage: any = '';
  uploading = false;
  textUploadBtn = 'Lưu';
  constructor(
    public dialogRef: MatDialogRef<DialogUploadCoverComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: string,
    private imagePersonalInformationService: ImagePersonalInformationService,
  ) { }
  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Event change input upload 
  fileChangeListener(event: any): void {
    this.imageChangedEvent = event;
  }

  // Event file dropped of dropzone
  // @Input: file output from directie 
  // Set dropped image base64 into cropper
  onFileDropped(event) {
    this.droppedImage = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  // Image loaded into cropper
  imageLoaded() {
    this.turnOnEditor = true;
  }
  /*
  @ Load fail
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
  @ Upload cover connect api
  */
  uploadCoverConnectApi() {
    this.uploading = true;
    this.imagePersonalInformationService.uploadCover(this.userId, this.croppedImage).subscribe(res => {
      if (res) {
        this.uploading = false;
        this.dialogRef.close(this.croppedImage);
      } else {
        this.textUploadBtn = 'Thử lại';
      }
    });
  }
}
