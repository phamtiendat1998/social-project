import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMutualFriendsComponent } from './profile-mutual-friends.component';

describe('ProfileMutualFriendsComponent', () => {
  let component: ProfileMutualFriendsComponent;
  let fixture: ComponentFixture<ProfileMutualFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMutualFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMutualFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
