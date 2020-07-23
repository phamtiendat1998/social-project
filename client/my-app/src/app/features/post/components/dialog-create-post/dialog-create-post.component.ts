import { Component, OnInit, ViewChild, ElementRef, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Mat
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// Interface
import { DialogCreatePostData } from '../../core/interface/dialog-create-post-data.interface';
import { Media } from '../../core/interface/media.interface';
import { FilePreview } from '../../core/interface/file-preview.interface';
import { UserInfo } from './../../../../shared/core/interface/user-info.interface';
// Service
import { PostService } from '../../services/post.service';
// Store
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { Observable, Subscription } from 'rxjs';
import { selectUserInfo } from './../../../../core/state/user-auth/user-auth.selectors';
import { snackBarConfig } from 'src/app/shared/core/config/snackbar-config';
import { MediaPost } from '../../core/interface/post/media-post.interface';

@Component({
  selector: 'app-dialog-create-post',
  templateUrl: './dialog-create-post.component.html',
  styleUrls: ['./dialog-create-post.component.scss']
})
export class DialogCreatePostComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  subUserInfo$: Subscription;
  userInfo: UserInfo;
  createPostForm: FormGroup;
  isAddFile = false;
  statusTagFriend = false;
  previewFiles: FilePreview[] = [];
  uploading = false;
  textMainBtn: string;
  constructor(
    private postService: PostService,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<DialogCreatePostComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogCreatePostData | null
  ) {
  }
  ngOnInit(): void {
    this.subUserInfo$ = this.store.pipe(select(selectUserInfo)).subscribe(res => this.userInfo = res);
    if (this.data === null) {
      this.textMainBtn = 'Chia sẻ';
      this.initCreatePostForm();
    } else {
      this.textMainBtn = 'Lưu';
      this.initCreatePostForm(this.data.content, this.data.privace);
      if (this.data.medias) {
        this.loadPreviewFile(this.data.medias);
      }
    }
  }
  ngOnDestroy() {
    this.subUserInfo$.unsubscribe();
  }
  /*
  @ Event close dialog
  */
  onClickCloseDialog(): void {
    this.dialogRef.close();
  }
  /*
  @ Init form group create post
  @ Input: content, tag, privacy of data from open dialog event in parent compoent
  */
  initCreatePostForm(content: string = '', privacy: string = 'public') {
    this.createPostForm = new FormGroup({
      content: new FormControl(content),
      privacy: new FormControl(privacy === 'public' ? true : false)
    });
  }
  /*
  @ Load preview file for eidt
  */
  loadPreviewFile(files: MediaPost[]) {
    for (const file of files) {
      const previewFile: FilePreview = { format: file.type, src: file.url };
      this.previewFiles.push(previewFile);
    }
    this.isAddFile = true;
  }
  /*
  @ Event click add photo
  */
  onClickToggleAddPhotos() {
    this.isAddFile = !this.isAddFile;
  }
  /*
  @ Event click tag friend
  */
  onClickToggleTagFriends() {
    this.statusTagFriend = !this.statusTagFriend;
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
      } else if (fileList[i].type.indexOf('video') > -1) {
        file.format = 'video';
      }
      reader.onload = (event) => {
        file.src = event.target.result;
        this.previewFiles.push(file);
      };
    }
    this.fileInput.nativeElement.value = '';
  }
  /*
  @ Event delete file in File Preview
  */
  deleteFilePreview(index: number) {
    this.previewFiles.splice(index, 1);
  }
  /*
  @ Event submit form group
  */
  onSubmitCreatePostForm() {
    console.log(this.data);
    if (this.createPostForm.value.content == '' && this.previewFiles.length == 0) {
      console.log('dutt me');
    } else if (this.data === null) {
      this.uploadPostConnectApi();
    } else if (this.data) {
      this.updatePostConnentApi();
    }
  }
  /*
  @ Upload Post
  @ Connect API
  */
  uploadPostConnectApi() {
    this.uploading = true;
    this.createPostForm.disable();
    this.postService.uploadPost(
      this.userInfo.userId,
      this.createPostForm.value.content,
      this.previewFiles.map(item => item.src),
      this.createPostForm.value.privacy ? 1 : 2
    ).subscribe(
      (res) => {
        this.uploading = false;
        if (res) {
          this.openSnackBar('Đăng bài viết thành công');
          this.onNoClick();
        } else {
          this.textMainBtn = 'Thử lại';
        }
      }
    );
  }
  /*
  @ Update post
  */
  updatePostConnentApi() {
    this.uploading = true;
    this.createPostForm.disable();
    this.postService.updatePost(
      this.userInfo.userId,
      this.data.postId,
      this.createPostForm.value.content,
      this.previewFiles.map(item => item.src),
      this.createPostForm.value.privacy ? 1 : 2
    ).subscribe(
      (res) => {
        this.uploading = false;
        if (res) {
          this.onNoClick();
          this.openSnackBar('Cập nhật bài viết thành công');
        } else {
          this.textMainBtn = 'Thử lại';
        }
      }
    );
  }
  /*
  @ Event close dialog
  */
  onNoClick(): void {
    this.dialogRef.close();
  }
  /*
  @ Open snackbar
  */
  openSnackBar(message: string, action: string = null) {
    this._snackBar.open(message, action, snackBarConfig);
  }
}
