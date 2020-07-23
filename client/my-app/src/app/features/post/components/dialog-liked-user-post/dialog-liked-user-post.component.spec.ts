import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLikedUserPostComponent } from './dialog-liked-user-post.component';

describe('DialogLikedUserPostComponent', () => {
  let component: DialogLikedUserPostComponent;
  let fixture: ComponentFixture<DialogLikedUserPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogLikedUserPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLikedUserPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
