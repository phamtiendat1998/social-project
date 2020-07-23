import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../core/interfaces/dialog-upload-avatar.interface';
import { FilePreview } from 'src/app/features/post/core/interface/file-preview.interface';
import { MediaAlbum } from '../../core/classes/media-album.class';

@Component({
  selector: 'app-dialog-upload-album-photo',
  templateUrl: './dialog-upload-album-photo.component.html',
  styleUrls: ['./dialog-upload-album-photo.component.scss']
})
export class DialogUploadAlbumPhotoComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  previewFiles: FilePreview[] = [];
  constructor(
    public dialogRef: MatDialogRef<DialogUploadAlbumPhotoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MediaAlbum | null) { }


  ngOnInit(): void {
    console.log(this.data);
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
      if (fileList[i].type.indexOf('image') > -1) {
        file.format = 'image';
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
