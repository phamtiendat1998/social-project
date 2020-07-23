import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSeenUsersStoryComponent } from './dialog-seen-users-story.component';

describe('DialogSeenUsersStoryComponent', () => {
  let component: DialogSeenUsersStoryComponent;
  let fixture: ComponentFixture<DialogSeenUsersStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSeenUsersStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSeenUsersStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
