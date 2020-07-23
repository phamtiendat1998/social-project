import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickChatComponent } from './quick-chat.component';

describe('QuickChatComponent', () => {
  let component: QuickChatComponent;
  let fixture: ComponentFixture<QuickChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
