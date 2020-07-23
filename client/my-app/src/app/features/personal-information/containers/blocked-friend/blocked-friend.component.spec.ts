import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedFriendComponent } from './blocked-friend.component';

describe('BlockedFriendComponent', () => {
  let component: BlockedFriendComponent;
  let fixture: ComponentFixture<BlockedFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
