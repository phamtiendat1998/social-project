import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyCommentPostComponent } from './reply-comment-post.component';

describe('ReplyCommentPostComponent', () => {
  let component: ReplyCommentPostComponent;
  let fixture: ComponentFixture<ReplyCommentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyCommentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyCommentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
