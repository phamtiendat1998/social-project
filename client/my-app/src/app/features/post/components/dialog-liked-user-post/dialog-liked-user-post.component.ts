import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
// Mat
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// Interface
import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
import { PagingHeader } from 'src/app/shared/core/interface/header.interface';
// Serivce
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-dialog-liked-user-post',
  templateUrl: './dialog-liked-user-post.component.html',
  styleUrls: ['./dialog-liked-user-post.component.scss']
})
export class DialogLikedUserPostComponent implements OnInit {
  likedUsers$: Observable<UserInfo>;
  headerLikedUser: PagingHeader = null;
  constructor(
    public dialogRef: MatDialogRef<DialogLikedUserPostComponent>,
    @Inject(MAT_DIALOG_DATA) public postId: string,
    private postSerivce: PostService,
  ) { }

  ngOnInit(): void {
    console.log('oke');
    this.postSerivce.getLikedUserPost(this.headerLikedUser, this.postId).subscribe();
  }
}
