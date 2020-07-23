import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReplyCommentPostComponent } from './update-reply-comment-post.component';

describe('UpdateReplyCommentPostComponent', () => {
  let component: UpdateReplyCommentPostComponent;
  let fixture: ComponentFixture<UpdateReplyCommentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReplyCommentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReplyCommentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
