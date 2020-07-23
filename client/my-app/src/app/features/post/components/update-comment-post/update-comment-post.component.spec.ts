import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommentPostComponent } from './update-comment-post.component';

describe('UpdateCommentPostComponent', () => {
  let component: UpdateCommentPostComponent;
  let fixture: ComponentFixture<UpdateCommentPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCommentPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCommentPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
