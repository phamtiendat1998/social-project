import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddFriendToChatComponent } from './dialog-add-friend-to-chat.component';

describe('DialogAddFriendToChatComponent', () => {
  let component: DialogAddFriendToChatComponent;
  let fixture: ComponentFixture<DialogAddFriendToChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddFriendToChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddFriendToChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
