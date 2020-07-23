import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-post-comment',
  templateUrl: './skeleton-post-comment.component.html',
  styleUrls: ['./skeleton-post-comment.component.scss']
})
export class SkeletonPostCommentComponent implements OnInit {
  @Input() isReplyComment: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
