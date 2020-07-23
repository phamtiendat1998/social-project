import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSocialAboutComponent } from './profile-social-about.component';

describe('ProfileSocialAboutComponent', () => {
  let component: ProfileSocialAboutComponent;
  let fixture: ComponentFixture<ProfileSocialAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileSocialAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSocialAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
