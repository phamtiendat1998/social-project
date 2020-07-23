import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestFriendComponent } from './suggest-friend.component';

describe('SuggestFriendComponent', () => {
  let component: SuggestFriendComponent;
  let fixture: ComponentFixture<SuggestFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
