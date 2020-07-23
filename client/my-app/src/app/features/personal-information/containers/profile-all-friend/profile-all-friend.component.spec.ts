import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAllFriendComponent } from './profile-all-friend.component';

describe('ProfileAllFriendComponent', () => {
  let component: ProfileAllFriendComponent;
  let fixture: ComponentFixture<ProfileAllFriendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileAllFriendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAllFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
