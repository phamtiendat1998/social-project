import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendFieldComponent } from './friend-field.component';

describe('FriendFieldComponent', () => {
  let component: FriendFieldComponent;
  let fixture: ComponentFixture<FriendFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
