import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteChatComponent } from './dialog-delete-chat.component';

describe('DialogDeleteChatComponent', () => {
  let component: DialogDeleteChatComponent;
  let fixture: ComponentFixture<DialogDeleteChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeleteChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
