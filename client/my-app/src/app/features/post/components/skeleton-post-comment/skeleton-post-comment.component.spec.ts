import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPostCommentComponent } from './skeleton-post-comment.component';

describe('SkeletonPostCommentComponent', () => {
  let component: SkeletonPostCommentComponent;
  let fixture: ComponentFixture<SkeletonPostCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonPostCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonPostCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
