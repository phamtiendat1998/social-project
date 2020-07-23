import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteReplyCommentPostComponent } from './dialog-delete-reply-comment-post.component';

describe('DialogDeleteReplyCommentPostComponent', () => {
  let component: DialogDeleteReplyCommentPostComponent;
  let fixture: ComponentFixture<DialogDeleteReplyCommentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteReplyCommentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteReplyCommentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
