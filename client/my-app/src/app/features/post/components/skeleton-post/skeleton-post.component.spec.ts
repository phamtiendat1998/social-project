import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPostComponent } from './skeleton-post.component';

describe('SkeletonPostComponent', () => {
  let component: SkeletonPostComponent;
  let fixture: ComponentFixture<SkeletonPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
