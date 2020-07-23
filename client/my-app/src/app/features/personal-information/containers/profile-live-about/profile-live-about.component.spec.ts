import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLiveAboutComponent } from './profile-live-about.component';

describe('ProfileLiveAboutComponent', () => {
  let component: ProfileLiveAboutComponent;
  let fixture: ComponentFixture<ProfileLiveAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLiveAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLiveAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
