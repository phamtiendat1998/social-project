import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMediaChatComponent } from './dialog-media-chat.component';

describe('DialogMediaChatComponent', () => {
  let component: DialogMediaChatComponent;
  let fixture: ComponentFixture<DialogMediaChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMediaChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMediaChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
