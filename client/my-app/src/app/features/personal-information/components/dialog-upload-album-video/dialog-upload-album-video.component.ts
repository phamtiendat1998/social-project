import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FilePreview } from 'src/app/features/post/core/interface/file-preview.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../core/interfaces/dialog-upload-avatar.interface';

@Component({
  selector: 'app-dialog-upload-album-video',
  templateUrl: './dialog-upload-album-video.component.html',
  styleUrls: ['./dialog-upload-album-video.component.scss']
})
export class DialogUploadAlbumVideoComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  previewFiles: FilePreview[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogUploadAlbumVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Event change value input picture
  */
  onChangePictureInput(input: any) {
    this.previewFile(input.target.files);
  }
  /*
  @ Show file from file-input or drop directive
  @ Reset file input
  @ Input: file list
  */
  previewFile(fileList: FileList) {
    for (let i = 0; i < fileList.length; i++) {
      const file: FilePreview = { format: '', src: '' };
      const reader = new FileReader();
      reader.readAsDataURL(fileList[i]);
      if (fileList[i].type.indexOf('video') > -1) {
        file.format = 'video';
        reader.onload = (event) => {
          file.src = event.target.result;
          this.previewFiles.push(file);
        };
      } else {
        return;
      }
    }
    this.fileInput.nativeElement.value = '';
  }
  /*
  @ Event delete file in File Preview
  */
  deleteFilePreview(index: number) {
    this.previewFiles.splice(index, 1);
  }
}
