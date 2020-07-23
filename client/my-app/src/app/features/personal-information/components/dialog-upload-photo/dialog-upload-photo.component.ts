import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../core/interfaces/dialog-upload-avatar.interface';
import { FilePreview } from 'src/app/features/post/core/interface/file-preview.interface';

@Component({
  selector: 'app-dialog-upload-photo',
  templateUrl: './dialog-upload-photo.component.html',
  styleUrls: ['./dialog-upload-photo.component.scss']
})
export class DialogUploadPhotoComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  filePreview: FilePreview[] = [];
  isWaitingUploadPhoto = false;
  constructor(
    public dialogRef: MatDialogRef<DialogUploadPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Show file from file-input or drop directive
  @ Reset file input
  @ Input: file list
  */
  previewPicture(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file: FilePreview = { format: '', src: '' };
      const reader = new FileReader();
      reader.readAsDataURL(fileList[i]);
      if (fileList[i].type.indexOf('image') > -1) {
        file.format = 'image';
        reader.onload = (event) => {
          file.src = event.target.result;
          this.filePreview.push(file);
        };
      }
    }
    this.fileInput.nativeElement.value = '';
  }
  /*
  @ Event delete file in File Preview
  */
  deleteFilePreview(index: number) {
    this.filePreview.splice(index, 1);
  }
  /*
  @ Event change value input picture
  */
  onChangePictureInput(input: any) {
    this.previewPicture(input.target.files);
  }
}
