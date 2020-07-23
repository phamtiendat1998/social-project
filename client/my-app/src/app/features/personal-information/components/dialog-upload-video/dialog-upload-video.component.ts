import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FilePreview } from 'src/app/features/post/core/interface/file-preview.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../core/interfaces/dialog-upload-avatar.interface';

@Component({
  selector: 'app-dialog-upload-video',
  templateUrl: './dialog-upload-video.component.html',
  styleUrls: ['./dialog-upload-video.component.scss']
})
export class DialogUploadVideoComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  filePreview: FilePreview[] = [];
  isWaitingUploadVideo = false;
  constructor(
    public dialogRef: MatDialogRef<DialogUploadVideoComponent>,
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
      if (fileList[i].type.indexOf('video') > -1) {
        file.format = 'video';
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
